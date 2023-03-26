import { useState, useRef, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BsPlusCircle } from "react-icons/bs";
import { BiMinusCircle } from "react-icons/bi";
import { v4 as uuidv4 } from "uuid";
import { useParams } from "react-router-dom";
import Select from "react-select";
import {
  // getClientById,
  createClient,
  editClient,
  deleteAttachment,
} from "../../../../Services/Clients";
import { useAlert } from "react-alert";
import { useDropzone } from "react-dropzone";
import fetcher from "../../../../Services/fetcher";

const CreateClient = () => {
  const { id } = useParams();
  const [banks, setBanks] = useState();
  const [clientTypes, setclientTypes] = useState();
  const [languages, setLanguages] = useState();
  const [title, setTitle] = useState("Create Client");
  const [client, setClient] = useState();
  const [bankAccounts, setBankAccounts] = useState([
    {
      id: uuidv4(),
      bank_id: null,
      account_number: "",
      IBAN: "",
    },
  ]);
  const [clientPersons, setClientPersons] = useState([
    {
      id: uuidv4(),
      name: "",
      title: "",
      phone: "",
      email: "",
    },
  ]);

  const [clientType, setClientType] = useState(null);
  const [names, setNames] = useState([]);
  const [isVat, setVat] = useState(0);
  const [isActive, setActive] = useState(1);
  const navigate = useNavigate();

  // const [show, setShow] = useState(true);
  const alert = useAlert();

  const [nameError, setNameError] = useState([]);
  const [phoneError, setPhoneError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [taxError, setTaxError] = useState(null);
  const [registerError, setRegisterError] = useState(null);
  const [typeError, setTypeError] = useState(null);
  const [bankError, setBankError] = useState(null);
  const [accountError, setAccountError] = useState(null);
  const [IBANError, setIBANError] = useState(null);
  const [personNameError, setPersonNameError] = useState(null);
  const [personTitleError, setPersonTitleError] = useState(null);
  const [personEmailError, setPersonEmailError] = useState(null);
  const [personPhoneError, setPersonPhoneError] = useState(null);

  const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
    useDropzone({
      accept: {
        "image/jpg": [".jpg", ".png"],
        "files/pdf": [".pdf"],
      },
    });
  const [files, setFiles] = useState([]);
  const [newFiles, setNewFiles] = useState([]);

  console.log("fileRejections", fileRejections);
  console.log("acceptedFiles", acceptedFiles);

  const deleteAttach = (id) => {
    console.log(id);
    deleteAttachment(id)
      .then((res) => {
        console.log(res);
        alert.success("Deleted Successfully!");
      })
      .catch((error) => {
        error?.response?.data?.message?.map((err) => alert.error(err));
      });
    setNewFiles(newFiles?.filter((file) => file.id !== id));
    setFiles(files?.filter((file) => file.id !== id));
  };

  const handleName = async (code, value) => {
    const titles = names?.map((t) => {
      if (t.code === code) {
        t.name = value;
      }
      return t;
    });
    setNames(titles);

    const errors = nameError?.map((err) => {
      if (err.code === code) {
        if (/^[a-zA-Z,\u0621-\u064A\u0660-\u0669 ]+$/.test(value)) {
          err.error = false;
        } else {
          err.error = true;
        }
      }
      return err;
    });

    setNameError(errors);
  };

  useEffect(() => {
    fetcher(`banks`)
      .then((data) => {
        if (data !== undefined) {
          setBanks(data?.data);
          console.log(data?.data);
        }
      })
      .catch((error) => {
        console.log(error?.message);
      });
    fetcher(`client-types`)
      .then((data) => {
        if (data !== undefined) {
          setclientTypes(data?.data);
          console.log(data?.data);
        }
      })
      .catch((error) => {
        console.log(error?.message);
      });
    fetcher(`languages`)
      .then((data) => {
        if (data !== undefined) {
          setLanguages(data?.data);
          console.log(data?.data);
        }
      })
      .catch((error) => {
        console.log(error?.message);
      });
    // console.log(banks);
  }, []);

  console.log(
    languages
      ?.filter((lang) => lang.isActive === true)
      ?.map((l) => ({
        code: l?.code,
        error: false,
      }))
  );
  // // useEffect(() => {
  // //   if (
  // //     emailError === false &&
  // //     taxError === false &&
  // //     registerError === false &&
  // //     typeError === false &&
  // //     bankError !== true &&
  // //     accountError !== true &&
  // //     IBANError !== true &&
  // //     personNameError !== true &&
  // //     personEmailError !== true &&
  // //     personTitleError !== true &&
  // //     personPhoneError !== true &&
  // //     (!nameError.find((err) => err.error === true) ||
  // //       !nameError.find((err) => err.error === ""))
  // //   ) {
  // //     setShow(false);
  // //   } else {
  // //     setShow(true);
  // //   }
  // // }, [
  // //   nameError,
  // //   phoneError,
  // //   emailError,
  // //   taxError,
  // //   registerError,
  // //   typeError,
  // //   bankError,
  // //   accountError,
  // //   IBANError,
  // //   personPhoneError,
  // //   personNameError,
  // //   personEmailError,
  // //   personTitleError,
  // // ]);

  // // console.log(show);

  useEffect(() => {
    setNewFiles(
      acceptedFiles?.map((file) => ({
        id: uuidv4(),
        attachment_path: file.path,
      }))
    );
    console.log("Accepted files", acceptedFiles);
  }, [acceptedFiles]);
  // // const { token } = useToken();

  useEffect(() => {
    setNames(
      languages
        ?.filter((lang) => lang.isActive === true)
        ?.map((l) => ({
          code: l?.code,
          name: "",
        }))
    );

    if (id) {
      fetcher(`clients/${id}`)
        .then((data) => {
          setClient(data.data);
          setTitle("Edit Client Profile");
          setClientType({
            value: data.data.type.id,
            label: data.data.type.name,
          });
          setClientPersons(data.data.client_persons);
          setBankAccounts(
            data.data?.banks?.map((bank) => ({
              id: uuidv4(),
              bank_id: bank.id,
              account_number: bank.account_number,
              IBAN: bank?.IBAN,
            }))
          );
          setFiles(
            data.data.attachments?.map((attach) => ({
              id: attach.id,
              attachment_path: attach.attachment_path,
            }))
          );
          // setNameError(
          //   languages
          //     ?.filter((lang) => lang.isActive === true)
          //     ?.map((l) => ({
          //       code: l?.code,
          //       error: false,
          //     }))
          // );
          setPhoneError(false);
          setEmailError(false);
          setTaxError(false);
          setRegisterError(false);
          setTypeError(false);
          setBankError(false);
          setAccountError(false);
          setIBANError(false);
          setPersonNameError(false);
          setPersonEmailError(false);
          setPersonPhoneError(false);
          setPersonTitleError(false);
        })
        .catch((error) => {
          console.log(error);
        });
      // if (data !== undefined) {
      //   setClient(data.data);
      //   // setBankAccounts(
      //   //   data.data?.banks?.map((bank) => ({
      //   //     id: uuidv4(),
      //   //     bank_id: bank.id,
      //   //     account_number: bank.account_number,
      //   //     IBAN: bank?.IBAN,
      //   //   }))
      //   // );
      //   setTitle("Edit Client Profile");
      //   // setClientPersons(data.data.client_persons);
      //   // setFiles(
      //   //   data.data.attachments?.map((attach) => ({
      //   //     id: attach.id,
      //   //     attachment_path: attach.attachment_path,
      //   //   }))
      //   // );
      // setClientType({
      //   value: data.data.type.id,
      //   label: data.data.type.type,
      // });
      //   // setActive(data.data.isActive);
      //   // setVat(data.data.isVat);
      // setNameError(
      //   languages
      //     ?.filter((lang) => lang.isActive === true)
      //     ?.map((l) => ({
      //       code: l?.code,
      //       error: false,
      //     }))
      // );
      //   // setPhoneError(false);
      //   // setEmailError(false);
      //   // setTaxError(false);
      //   // setRegisterError(false);
      //   // setTypeError(false);
      //   // // setBankError(false);
      //   // setAccountError(false);
      //   // setIBANError(false);
      //   // setPersonNameError(false);
      //   // setPersonEmailError(false);
      //   // setPersonPhoneError(false);
      //   // setPersonTitleError(false);
      // }
      // });
    }
    // } else {
    //   setNameError(
    //     languages
    //       ?.filter((lang) => lang.isActive === true)
    //       ?.map((l) => ({
    //         code: l?.code,
    //         error: "",
    //       }))
    //   );
    // }
  }, [id, languages]);

  useEffect(() => {
    client?.translations?.map((trans) => handleName(trans.code, trans.name));
  }, [client]);

  const phoneRef = useRef();
  const emailRef = useRef();
  const registerRef = useRef();
  const taxRef = useRef();

  console.log(client);

  let ClientObj = {
    languages: names,
    client_type_id: clientType?.value,
    email: emailRef.current?.value,
    phone_number: phoneRef.current?.value,
    commercial_register: registerRef.current?.value,
    tax_card: taxRef.current?.value,
    banks: bankError === null ? [] : bankAccounts,
    client_persons: clientPersons[0]?.name ? clientPersons : [],
    // attachments: newFiles?.map((file) => file.attachment_path),
    isVat: isVat,
    isActive: isActive,
  };

  // const Reset = () => {
  //   setNames(
  //     languages
  //       ?.filter((lang) => lang.isActive === true)
  //       ?.map((l) => ({
  //         code: l?.code,
  //         name: "",
  //       }))
  //   );
  //   setClient({});
  //   setClientType(null);
  //   emailRef.current.value = "";
  //   phoneRef.current.value = "";
  //   registerRef.current.value = "";
  //   taxRef.current.value = "";
  //   setBankAccounts([
  //     {
  //       id: uuidv4(),
  //       bank_id: "",
  //       account_number: "",
  //       IBAN: "",
  //     },
  //   ]);

  //   setClientPersons([
  //     {
  //       id: uuidv4(),
  //       name: "",
  //       title: "",
  //       phone: "",
  //       email: "",
  //     },
  //   ]);
  //   setVat(0);
  //   setActive(1);
  //   setShow(true);
  // };

  const Append = () => {
    setBankAccounts([
      ...bankAccounts,
      {
        id: uuidv4(),
        bank_id: "",
        account_number: "",
        IBAN: "",
      },
    ]);
  };

  const AppendPersons = () => {
    setClientPersons([
      ...clientPersons,
      {
        id: uuidv4(),
        name: "",
        title: "",
        phone: "",
        email: "",
      },
    ]);
  };

  const handleBankAccounts = (e, id) => {
    const newAcc = bankAccounts.map((acc) => {
      if (acc.id === id) {
        if (e.target?.name === undefined) {
          acc.bank_id = e.value;
        } else {
          acc[e.target?.name] = e.target.value;
        }
      }
      return acc;
    });
    setBankAccounts(newAcc);
    // setBankError(false);

    if (e.target?.name === "account_number") {
      if (/^[0-9]+$/.test(e.target?.value)) {
        setAccountError(false);
      } else {
        setAccountError(true);
      }
    }
    if (e.target?.name === "IBAN") {
      if (/^[a-zA-Z,0-9]+$/.test(e.target?.value)) {
        setIBANError(false);
      } else {
        setIBANError(true);
      }
    }
  };

  const handleClientPersons = (e, id) => {
    const newPerson = clientPersons.map((p) => {
      if (p.id === id) {
        p[e.target.name] = e.target.value;
      }
      return p;
    });
    setClientPersons(newPerson);

    if (e.target.name === "name") {
      if (/^[a-zA-Z ]+$/.test(e.target?.value)) {
        setPersonNameError(false);
      } else {
        setPersonNameError(true);
      }
    }
    if (e.target.name === "title") {
      if (/^[a-zA-Z ]+$/.test(e.target?.value)) {
        setPersonTitleError(false);
      } else {
        setPersonTitleError(true);
      }
    }
    if (e.target.name === "email") {
      if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(e.target?.value)) {
        setPersonEmailError(false);
      } else {
        setPersonEmailError(true);
      }
    }
    if (e.target.name === "phone") {
      if (/^01[0-2,5]{1}[0-9]{8}$/.test(e.target?.value)) {
        setPersonPhoneError(false);
      } else {
        setPersonPhoneError(true);
      }
    }
  };

  const handleClientType = (e) => {
    setClientType(e);
    setTypeError(false);
  };

  const handleRemoveAccount = (e, id) => {
    e.preventDefault();
    const accounts = [...bankAccounts];
    accounts.splice(
      accounts.findIndex((acc) => acc.id === id),
      1
    );
    setBankAccounts(accounts);
  };

  const handleRemovePerson = (e, id) => {
    e.preventDefault();
    const persons = [...clientPersons];
    persons.splice(
      persons.findIndex((p) => p.id === id),
      1
    );
    setClientPersons(persons);
  };

  const createProfile = (e) => {
    e.preventDefault();

    // if (!show) {
    if (id) {
      editClient(id, ClientObj)
        .then((res) => {
          console.log(res);
          alert.success(res.message);
          navigate("/clients");
        })
        .catch((error) => {
          // setShow(true);
          error?.response?.data?.message?.map((err) => alert.error(err));
        });
    } else {
      createClient(ClientObj)
        .then((res) => {
          alert.success("Item Added Successfully");
          // Reset();
          // setShow(true);
        })
        .catch((error) => {
          // setShow(true);
          error?.response?.data?.message?.map((err) => alert.error(err));
        });
    }
    // } else {
    //   alert.error("please enter a valid data");
    // }

    // window.location.reload()
    console.log(ClientObj);
  };

  return (
    <div className="container">
      <h1>{title}</h1>
      <form onSubmit={(e) => createProfile(e)}>
        <div className="row ">
          {/* <div className="mx-auto w-25 text-center">
                <img src={client?.logo} className="profile" alt="profile" />
                <input ref={registerRef} type="file" className="form-control my-2" defaultValue={client?.logo} placeholder={client?.logo}/>
            </div> */}
          <div className="col-md-12 my-5 px-4">
            <div className="form-group row">
              {names?.map((lang) => (
                <>
                  <label
                    htmlFor={`name${lang?.code}`}
                    className="col-md-1 col-sm-12 col-form-label px-0"
                  >
                    Name ({lang?.code})
                  </label>
                  <div className="col-md-5 col-sm-12 mb-3">
                    <input
                      type="text"
                      className="form-control"
                      required
                      id={`brand${lang?.code}`}
                      name={`name-${lang?.code}`}
                      placeholder={`Name ${lang?.code}`}
                      onChange={(e) => handleName(lang?.code, e.target?.value)}
                      value={lang?.name}
                    />
                  </div>
                </>
              ))}

              {nameError.find((err) => err.error === true) && (
                <span className="error">
                  Please enter valid Input No Special Charachters / No Numbers
                </span>
              )}

              <label
                htmlFor="phone"
                className="col-md-1 col-sm-6 col-form-label px-0"
              >
                Phone
              </label>
              <div className="col-md-5 col-sm-12 mb-3">
                <Controller
                  control={control}
                  name="phone_number"
                  {...register(`phone_number`, {
                    required: "Phone is Required.",
                  })}
                  rules={{
                    validate: (value) => isValidPhoneNumber(value),
                  }}
                  render={({ field: { onChange, value } }) => (
                    <PhoneInput
                      //   defaultCountry="SA"
                      placeholder="Phone"
                      value={"+201117572565"}
                      //   defaultValue={client?.phone_number}
                      onChange={onChange}
                      id="phone_number"
                    />
                  )}
                />

                {errors["phone_number"] && (
                  <span className="error">
                    Please enter a valid phone_number number.
                  </span>
                )}
              </div>
            </div>
            <div className="form-group row my-3">
              <label
                htmlFor="email"
                className="col-md-1 col-sm-12 col-form-label px-0"
              >
                Email
              </label>
              <div className="col-md-5 col-sm-12">
                <input
                  ref={emailRef}
                  type="email"
                  required
                  className="form-control"
                  id="email"
                  placeholder="Email"
                  defaultValue={client?.email}
                  onChange={(e) =>
                    /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(e.target.value)
                      ? setEmailError(false)
                      : setEmailError(true)
                  }
                />
                {emailError && (
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
              <div className="col-md-5 col-sm-6">
                <input
                  ref={taxRef}
                  type="text"
                  className="form-control"
                  id="tax"
                  required
                  placeholder="Tax"
                  defaultValue={client?.tax_card}
                  onChange={(e) =>
                    /^[0-9,-]{1,}$/.test(e.target.value)
                      ? setTaxError(false)
                      : setTaxError(true)
                  }
                />
                {taxError && (
                  <span className="error">Tax Card Must Be A Valid Number</span>
                )}
              </div>
            </div>
            <div className="form-group row my-3">
              <label
                htmlFor="commercialRegister"
                className="col-md-2 col-sm-12 col-form-label px-0"
              >
                Commercial Register
              </label>
              <div className="col-md-4 col-sm-12">
                <input
                  ref={registerRef}
                  type="text"
                  required
                  className="form-control"
                  id="commercialRegister"
                  placeholder="Commercial Register"
                  defaultValue={client?.commercial_register}
                  onBlur={(e) =>
                    /^[0-9,-]{1,}$/.test(e.target.value)
                      ? setRegisterError(false)
                      : setRegisterError(true)
                  }
                />
                {registerError && (
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
                <Select
                  placeholder="Select Client Type"
                  value={{ value: clientType?.value, label: clientType?.label }}
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
                  onChange={(e) => handleClientType(e)}
                />
                {typeError && (
                  <span className="error">Please Select Type.</span>
                )}
              </div>
            </div>
            <hr className="my-5 " />
            <div className="mt-5 bank">
              <h5 className="head">Bank Accounts</h5>
              <BsPlusCircle className="mx-5 add" onClick={Append} />{" "}
            </div>
            {bankAccounts?.map((acc) => (
              <div div className="keyclientSection" key={acc.id}>
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
                      name="duration"
                      {...register(`banks[${index}].bank_id`, {
                        required: "Bank is Required.",
                      })}
                      render={({ field: { onChange, value } }) => (
                        <Select
                          placeholder="Select Bank"
                          value={value}
                          isMulti={false}
                          isClearable={false}
                          options={banks?.map((bank) => ({
                            value: bank?.id,
                            label: bank?.name,
                          }))}
                          classNamePrefix="Select"
                          required
                          onChange={(e) => {
                            onChange(e.value);
                          }}
                        />
                      )}
                    />
                    {/* {errors.banks.bank_id && (
                        <span className="error">Please Select Bank.</span>
                      )} */}
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
                      id="account"
                      name="account_number"
                      placeholder="Account Number"
                      defaultValue={acc.account_number}
                      onBlur={(e) => handleBankAccounts(e, acc.id)}
                    />
                    {accountError && (
                      <span className="error">
                        Please Enter A Valid Account Number
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
                      id="IBAN"
                      name="IBAN"
                      placeholder="IBAN"
                      defaultValue={acc.IBAN}
                      onBlur={(e) => handleBankAccounts(e, acc.id)}
                    />
                    {IBANError && (
                      <span className="error">Please Enter A Valid IBAN</span>
                    )}
                  </div>

                  <div className="col-md-1">
                    <BiMinusCircle
                      className="add"
                      onClick={(e) => handleRemoveAccount(e, acc.id)}
                    />
                  </div>
                </div>
              </div>
            ))}
            <hr className="my-5 " />

            <div className="section">
              <h5 className="head">Client Contacts</h5>
              <BsPlusCircle className="add mx-5" onClick={AppendPersons} />
            </div>

            {clientPersons?.map((person) => (
              <div div className="keyPersonSection" key={person.id}>
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
                      onBlur={(e) => handleClientPersons(e, person.id)}
                      defaultValue={person.name}
                    />
                    {personNameError && (
                      <span className="error">
                        Please enter valid Input No Special Charachters / No
                        Numbers
                      </span>
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
                      onBlur={(e) => handleClientPersons(e, person.id)}
                      defaultValue={person.title}
                    />
                    {personTitleError && (
                      <span className="error">
                        Please enter valid Input No Special Charachters / No
                        Numbers
                      </span>
                    )}
                  </div>
                  <div className="col-md-1">
                    <BiMinusCircle
                      className="add"
                      onClick={(e) => handleRemovePerson(e, person.id)}
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
                      onBlur={(e) => handleClientPersons(e, person.id)}
                      defaultValue={person.email}
                    />
                    {personEmailError && (
                      <span className="error">
                        Email Must be valid Ex: test@test.com
                      </span>
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
                      type="text"
                      className="form-control"
                      name="phone"
                      placeholder="Phone"
                      onBlur={(e) => handleClientPersons(e, person.id)}
                      defaultValue={person.phone}
                    />
                    {personPhoneError && (
                      <span className="error">
                        Phone Must Be A Valid Number
                      </span>
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
              <p>Upload Attachments</p>
            </div>
            <aside>
              <ul>
                {files?.map((file) => (
                  <li key={file.id}>
                    {file.attachment_path}{" "}
                    <a
                      className="btn bg-gold py-0 px-1 mx-5"
                      onClick={() => deleteAttach(file.id)}
                    >
                      x
                    </a>
                  </li>
                ))}
              </ul>
              <ul>
                {newFiles?.map((file) => (
                  <li key={file.id}>
                    {file.attachment_path}{" "}
                    <a
                      className="btn bg-gold py-0 px-1 mx-5"
                      onClick={() => deleteAttach(file.id)}
                    >
                      x
                    </a>
                  </li>
                ))}
              </ul>
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
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateClient;
