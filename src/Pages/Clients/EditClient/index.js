import { useState, useEffect, useCallback } from "react";
import { BsPlusCircle } from "react-icons/bs";
import { BiMinusCircle } from "react-icons/bi";
import { useParams } from "react-router-dom";
import Select from "react-select";
import { useDropzone } from "react-dropzone";
import fetcher from "../../../Services/fetcher";
import { useForm, useFieldArray, Controller } from "react-hook-form";
// import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
// import "react-phone-number-input/style.css";
import useSimplePost from "../../../customHooks/useSimplePost";

const EditClient = () => {
  const { id } = useParams();
  const [client, setClient] = useState();

  const { formPost, Delete } = useSimplePost();
  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      banks: client?.banks,
      client_persons: client?.client_persons,
    },
  });

  const {
    fields: bankFields,
    append: bankAppend,
    remove: bankRemove,
  } = useFieldArray({
    name: "banks",
    control,
  });

  const {
    fields: personFields,
    append: personAppend,
    remove: personRemove,
  } = useFieldArray({
    name: "client_persons",
    control,
  });

  const [banks, setBanks] = useState();
  const [clientTypes, setclientTypes] = useState();
  const [title, setTitle] = useState("Edit Client");

  const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
    useDropzone({
      accept: {
        "image/jpg": [".jpg", ".png"],
        "files/pdf": [".pdf"],
      },
      onDrop: (acceptedFiles) => {
        setNewFiles([...newFiles, ...acceptedFiles]);
      },
    });

  const [files, setFiles] = useState([]);
  const [newFiles, setNewFiles] = useState([]);
  const [clientType, setClientType] = useState();
  console.log("acceptedFiles", acceptedFiles);
  console.log("errors", errors);

  const deleteAttach = (id) => {
    console.log(id);
    Delete(id, "clients/attachments");
    setFiles(files?.filter((file) => file.id !== id));
  };

  useEffect(() => {
    fetcher(`banks`)
      .then((data) => {
        if (data !== undefined) {
          setBanks(data?.data);
        }
      })
      .catch((error) => {
        console.log(error?.message);
      });
    fetcher(`client-types`)
      .then((data) => {
        if (data !== undefined) {
          setclientTypes(data?.data);
        }
      })
      .catch((error) => {
        console.log(error?.message);
      });
  }, []);

  useEffect(() => {
    if (id !== "undefined") {
      fetcher(`clients/${id}`).then((x) => setClient(x.data));
    }
  }, [id]);

  useEffect(() => {
    setValue(
      "banks",
      client?.banks?.map((bank) => ({
        bank_id: bank.id,
        IBAN: bank?.IBAN,
        account_number: bank?.account_number,
      }))
    );
    setValue(
      "client_persons",
      client?.client_persons?.map((client) => ({
        name: client?.name,
        title: client?.title,
        phone: client?.phone,
        email: client?.email,
      }))
    );
    setValue("phone_number", client?.phone);
    setValue("email", client?.email);
    setValue("tax_card", client?.tax_card);
    setValue("commercial_register", client?.commercial_register);
    setValue("client_type_id", {
      value: clientType,
      label: clientTypes?.find((type) => type.id === clientType),
    });
    setValue("tax_card", client?.tax_card);
    setValue("isActive", client?.isActive === true ? 1 : 0);
    setValue("isVat", client?.isVat === true ? 1 : 0);
    setClientType(client?.type?.id);
    setFiles(client?.attachments);
  }, [client]);

  const onSubmit = (data) => {
    console.log("data", data);
    const newData = Object.values(data.languages);
    const obj = [];
    for (let i = 0; i < newData.length; i++) {
      obj.push({
        code: String(Object.keys(newData[i])),
        name: String(Object.values(newData[i])),
      });
    }
    data.languages = obj;
    data.client_type_id = clientType;
    formPost(id, "clients", data, false);

    let attachments = new FormData();
    newFiles?.map((file, i) => {
      attachments.append(`attachments[${i}]`, file);
      console.log(file);
    });

    formPost(null, `clients/attachments/${client?.id}`, attachments, true);
  };

  console.log("client", client);

  return (
    <div className="container">
      <h1>{title}</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          {/* <div className="mx-auto w-25 text-center">
                <img src={client?.logo} className="profile" alt="profile" />
                <input ref={registerRef} type="file" className="form-control my-2" defaultValue={client?.logo} placeholder={client?.logo}/>
            </div> */}
          <div className="col-md-12 my-5 px-4">
            <div className="form-group row">
              {client?.translations?.map((lang, index) => (
                <>
                  <label
                    className="col-md-1 col-sm-12 col-form-label px-0 mb-3"
                    htmlFor={`title${lang?.code}`}
                  >
                    Name ({lang?.code})
                  </label>
                  <div className="col-md-5 col-sm-12">
                    <input
                      className="form-control col-md-6"
                      id={`title${lang?.name}`}
                      defaultValue={lang?.name}
                      {...register(`languages.${index}.${lang?.code}`, {
                        required: "This Field is requird",
                        minLength: {
                          value: 3,
                          message: "Minimun length is 3.",
                        },
                      })}
                      placeholder={`${lang?.name}`}
                    />
                    {errors?.languages && errors.languages[`${index}`] && (
                      <span className="error ">This field is required</span>
                    )}
                  </div>
                </>
              ))}
              <label
                htmlFor="phone_number"
                className="col-md-1 col-sm-6 col-form-label px-0"
              >
                Phone
              </label>
              <div className="col-md-5 col-sm-12 mb-3">
                <input
                  type="number"
                  required
                  className="form-control"
                  id="phone"
                  placeholder="Phone"
                  defaultValue={client?.phone_number}
                  {...register("phone_number", {
                    required: "Phone is Required.",
                  })}
                />
                {errors.phone_number && (
                  <span className="error">Phone Must Be A Valid Number</span>
                )}
              </div>

              <label
                htmlFor="email"
                className="col-md-1 col-sm-12 col-form-label px-0"
              >
                Email
              </label>
              <div className="col-md-5 col-sm-12 mb-3">
                <input
                  type="email"
                  required
                  className="form-control"
                  id="email"
                  placeholder="Email"
                  defaultValue={client?.email}
                  {...register("email", {
                    required: "Email is Required.",
                    pattern: {
                      value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i,
                      message: "Please enter valid input.",
                    },
                  })}
                />
                {errors?.email && (
                  <span className="error">
                    Email Must be valid Ex: test@test.com
                  </span>
                )}
              </div>
              <label
                htmlFor="tax"
                className="col-md-1 col-sm-12 col-form-label px-0"
              >
                Tax Card
              </label>
              <div className="col-md-5 col-sm-6 mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="tax"
                  required
                  placeholder="Tax"
                  defaultValue={client?.tax_card}
                  {...register("tax_card", {
                    required: "Tax Card is Required.",
                    pattern: {
                      value: /^[0-9,-]{1,}$/i,
                      message: "Please enter valid input.",
                    },
                  })}
                />
                {errors.tax_card && (
                  <span className="error">Tax Card Must Be A Valid Number</span>
                )}
              </div>

              <label
                htmlFor="commercialRegister"
                className="col-md-2 col-sm-12 col-form-label px-0"
              >
                Commercial Register
              </label>
              <div className="col-md-4 col-sm-12">
                <input
                  type="text"
                  required
                  className="form-control"
                  id="commercialRegister"
                  placeholder="Commercial Register"
                  //   defaultValue={client?.commercial_register}
                  {...register("commercial_register", {
                    required: "Commercial Register is Required.",
                    pattern: {
                      value: /^[0-9,-]{1,}$/i,
                      message: "Please enter valid input.",
                    },
                  })}
                />
                {errors.commercial_register && (
                  <span className="error">
                    Commercial Register Must Be A Valid Number
                  </span>
                )}
              </div>
              <label
                htmlFor="clientType"
                className="col-md-1 col-sm-12 col-form-label px-0"
              >
                Client Type
              </label>
              <div className="col-md-5 col-sm-12">
                <Controller
                  control={control}
                  name="client_type_id"
                  {...register(`client_type_id`, {
                    required: "Client Type is Required.",
                  })}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      placeholder="Select Client Type"
                      //   defaultValue={{
                      //     value: clientType,
                      //     label: clientTypes?.find(
                      //       (type) => type.id == clientType
                      //     )?.type,
                      //   }}
                      value={{
                        value: clientType,
                        label: clientTypes?.find(
                          (type) => type.id == clientType
                        )?.type,
                      }}
                      isMulti={false}
                      isClearable={true}
                      options={clientTypes
                        ?.filter((type) => type.isActive === true)
                        ?.map((type) => ({
                          value: type.id,
                          label: type.type,
                        }))}
                      classNamePrefix="Select"
                      required
                      onChange={(e) => {
                        onChange(e.value);
                        setClientType(e.value);
                      }}
                    />
                  )}
                />

                {errors.client_type_id && (
                  <span className="error">Please Select Type.</span>
                )}
              </div>

              <div className="col-md-3 px-0">
                <label
                  className="col-md-3 col-sm-12 col-form-label"
                  htmlFor="active"
                >
                  Active:
                </label>
                <input
                  id="active"
                  className="col-md-1"
                  type="checkbox"
                  {...register(`isActive`, {
                    required: false,
                  })}
                //   defaultChecked={client?.isActive}
                />
              </div>
              <div className="col-md-3 px-0">
                <label
                  className="col-md-3 col-sm-12 col-form-label"
                  htmlFor="active"
                >
                  Vat:
                </label>
                <input
                  id="vat"
                  className="col-md-1"
                  type="checkbox"
                  {...register(`isVat`, {
                    required: false,
                  })}
                //   defaultChecked={client?.isVat}
                />
              </div>
            </div>
            <hr className="my-5 " />
            <div className="mt-5 bank">
              <h5 className="head">Bank Accounts</h5>
              <BsPlusCircle
                className="mx-5 add"
                onClick={() =>
                  bankAppend({ bank_id: "", account_number: "", IBAN: "" })
                }
              />{" "}
            </div>
            {bankFields?.map((field, index) => {
              console.log(field);
              return (
                <div div className="keyclientSection" key={field.id}>
                  <div className="form-group row mt-4">
                    <label
                      htmlFor="bankName"
                      className="col-md-2 col-sm-12 col-form-label"
                    >
                      Bank Name
                    </label>
                    <div className="col-md-2 col-sm-12">
                      <Controller
                        control={control}
                        name="bank_id"
                        {...register(`banks[${index}].bank_id`)}
                        render={({ field: { onChange, value } }) => {
                          console.log(field);
                          return (
                            <Select
                              placeholder="Select Bank"
                              defaultValue={{
                                value: field?.bank_id,
                                label: banks?.find(
                                  (bank) => bank?.id === field?.bank_id
                                )?.name,
                              }}
                              isMulti={false}
                              isClearable={false}
                              options={banks?.map((bank) => ({
                                value: bank?.id,
                                label: bank?.name,
                              }))}
                              classNamePrefix="Select"
                              onChange={(e) => {
                                onChange(e.value);
                              }}
                            />
                          );
                        }}
                      />
                      {errors[`banks.${index}.bank_id`] && (
                        <span className="error">Please select bank.</span>
                      )}
                    </div>
                    <label
                      htmlFor="account"
                      className="col-md-2 col-sm-12 col-form-label"
                    >
                      Account Number
                    </label>
                    <div className="col-md-2 col-sm-12">
                      <input
                        type="text"
                        className="form-control"
                        name="account_number"
                        placeholder="Account Number"
                        defaultValue={field.account_number}
                        {...register(`banks.${index}.account_number`)}
                      />
                      {errors[`banks.${index}.account_number`] && (
                        <span className="error">
                          Please Enter A Valid Account Number.
                        </span>
                      )}
                    </div>

                    <label
                      htmlFor="IBAN"
                      className="col-md-1 col-sm-12 col-form-label"
                    >
                      IBAN
                    </label>
                    <div className="col-md-2 col-sm-12">
                      <input
                        type="text"
                        className="form-control"
                        name="IBAN"
                        // placeholder="IBAN"
                        defaultValue={field.IBAN}
                        {...register(`banks.${index}.IBAN`)}
                      />
                      {errors[`banks.${index}.IBAN`] && (
                        <span className="error">
                          Please Enter A Valid Account Number
                        </span>
                      )}
                    </div>

                    <div className="col-md-1">
                      <BiMinusCircle
                        className="add"
                        onClick={() => bankRemove(index)}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
            <hr className="my-5 " />

            <div className="section">
              <h5 className="head">Client Contacts</h5>
              <BsPlusCircle
                className="add mx-5"
                onClick={() => {
                  personAppend({
                    name: "",
                    title: "",
                    email: "",
                    phone: "",
                  });
                }}
              />
            </div>

            {personFields?.map((field, index) => (
              <div div className="keyPersonSection" key={field.id}>
                <div className="form-group row mt-4">
                  <label
                    htmlFor="name"
                    className="col-md-1 col-sm-6 col-form-label"
                  >
                    Name
                  </label>
                  <div className="col-md-4 col-sm-6">
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      placeholder="Name"
                      {...register(`client_persons.${index}.name`)}
                      defaultValue={field.name}
                    />
                    {errors[`client_persons.${index}.name`] && (
                      <span className="error">Please Enter A Valid Input</span>
                    )}
                  </div>
                  <label
                    htmlFor="title"
                    className="col-md-1 col-sm-6 col-form-label"
                  >
                    Title
                  </label>
                  <div className="col-md-4 col-sm-6">
                    <input
                      type="text"
                      className="form-control"
                      name="title"
                      placeholder="Title"
                      {...register(`client_persons.${index}.title`)}
                      defaultValue={field.title}
                    />
                    {errors[`client_persons.${index}.title`] && (
                      <span className="error">Please Enter A Valid Input</span>
                    )}
                  </div>
                  <div className="col-md-1">
                    <BiMinusCircle
                      className="add"
                      onClick={() => personRemove(index)}
                    />
                  </div>
                </div>
                <div className="form-group row mt-4">
                  <label
                    htmlFor="email"
                    className="col-md-1 col-sm-6 col-form-label"
                  >
                    Email
                  </label>
                  <div className="col-md-4 col-sm-6">
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      placeholder="Email"
                      {...register(`client_persons.${index}.email`)}
                      defaultValue={field.email}
                    />
                    {errors[`client_persons.${index}.email`] && (
                      <span className="error">Please Enter A Valid Input</span>
                    )}
                  </div>
                  <label
                    htmlFor="phone"
                    className="col-md-1 col-sm-6 col-form-label"
                  >
                    Phone
                  </label>
                  <div className="col-md-4 col-sm-6">
                    <input
                      type="number"
                      className="form-control"
                      name="phone"
                      placeholder="Phone"
                      {...register(`client_persons.${index}.phone`)}
                      defaultValue={field.phone}
                    />
                    {errors[`client_persons.${index}.phone`] && (
                      <span className="error">Please Enter A Valid Input</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div
              {...getRootProps({ className: "dropzone" })}
              className="info-box py-5 text-center my-4"
            >
              <input {...getInputProps()} />
              <p className="mb-5">Upload Attachments</p>
              <ul className="d-flex w-100 py-0  flex-wrap">
                {files?.map((file) => (
                  <li key={file.id}>
                    <div className="file">
                      {file?.type ? (
                        <img
                          src={
                            file?.type === "application/pdf"
                              ? `https://www.pngall.com/wp-content/uploads/2018/05/Files-High-Quality-PNG.png`
                              : URL.createObjectURL(file)
                          }
                          className="file-img"
                        />
                      ) : (
                        <img
                          src={
                            file?.file ? file?.file : URL.createObjectURL(file)
                          }
                          className="file-img"
                        />
                      )}
                      <a
                        className="btn btn-danger py-0 px-2 m-1"
                        onClick={() => deleteAttach(file.id)}
                      >
                        x
                      </a>
                    </div>
                    <p className="file-name">{file?.path}</p>
                  </li>
                ))}
                {newFiles?.map((file) => (
                  <li key={file.id}>
                    <div className="file">
                      {file?.type ? (
                        <img
                          src={
                            file?.type === "application/pdf"
                              ? `https://www.pngall.com/wp-content/uploads/2018/05/Files-High-Quality-PNG.png`
                              : URL.createObjectURL(file)
                          }
                          className="file-img"
                        />
                      ) : (
                        <img
                          src={
                            file?.file ? file?.file : URL.createObjectURL(file)
                          }
                          className="file-img"
                        />
                      )}
                      <a
                        className="btn btn-danger py-0 px-2 m-1"
                        onClick={() => deleteAttach(file.id)}
                      >
                        x
                      </a>
                    </div>
                    <p className="file-name">{file?.path}</p>
                  </li>
                ))}
              </ul>
            </div>
            <aside>
              {fileRejections?.length > 0 && (
                <span className="error">*images and pdf only*</span>
              )}
            </aside>
          </div>
          <div className="d-flex justify-content-center my-5">
            <button
              className="btn bg-gold save w-50"
              type="submit"
            // disabled={show}
            >
              Update
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditClient;
