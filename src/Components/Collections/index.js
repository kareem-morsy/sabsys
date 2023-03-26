import { useState } from "react";
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import fetcher from "../../Services/fetcher";
import Select from "react-select";
import useSimplePost from "../../customHooks/useSimplePost";
import FetchedTable from "../FetchedTable";
import { useDropzone } from "react-dropzone";
import { useLocation } from "react-router-dom";
import { useAlert } from "react-alert";
import Table from "../TableComponent/Table";
import DataTable from "react-data-table-component";
const CreateCollections = () => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm();

  const { formPost } = useSimplePost();

  const search = useLocation().search;
  const client_id = new URLSearchParams(search).get("client_id");
  const res_id = new URLSearchParams(search).get("res_id");

  const alert = useAlert();
  const [clients, setClients] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [paymentTypes, setPaymentTypes] = useState([]);
  const [clientId, setClientId] = useState(client_id);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedAmount, setSelectedAmount] = useState(0);
  const [collectionAmount, setCollectionAmount] = useState(0);
  const [files, setFiles] = useState([]);
  const [wallet, setWallet] = useState(0);
  const [client, setClient] = useState(0);
  const [reservation, setReservation] = useState([]);

  const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
    useDropzone({
      accept: {
        "image/jpg": [".jpg", ".png"],
        "files/pdf": [".pdf"],
      },
      onDrop: (acceptedFiles) => {
        setFiles([...files, ...acceptedFiles]);
      },
    });

  const deleteAttach = (name) => {
    console.log(name);
    setFiles(files?.filter((file) => file.name !== name));
  };

  useEffect(() => {
    fetcher(`clients`)
      .then((data) => {
        if (data !== undefined) {
          setClients(data?.data);
        }
      })
      .catch((error) => {
        console.log(error?.message);
      });
    fetcher(`payment-method`)
      .then((data) => {
        if (data !== undefined) {
          setPaymentMethods(data?.data);
        }
      })
      .catch((error) => {
        console.log(error?.message);
      });

    fetcher(`payment-type`)
      .then((data) => {
        if (data !== undefined) {
          setPaymentTypes(data?.data);
        }
      })
      .catch((error) => {
        console.log(error?.message);
      });
  }, []);

  useEffect(() => {
    fetcher(`collections/reservation/${res_id}`).then((x) =>
      setReservation([x.data])
    );
  }, [res_id]);

  console.log(reservation);

  useEffect(() => {
    fetcher(`clients/${client_id}`).then((x) => setClient(x.data));
    clientHandler(client_id);
    setClientId(client_id);
  }, [client_id]);

  //   useEffect(() => {
  //     fetcher(`collections/reservation/${res_id}`).then((x) => {
  //       setHistory(x.data.previous_collections);
  //       setClient(x.data.client);
  //       setWallet(x.data ? x.data.client.wallet : 0);
  //     });
  //     // clientHandler(client_id);
  //   }, [res_id]);

  const handleSelected = (rows) => {
    console.log(rows);
    setSelectedRows(rows?.selectedRows);
    setSelectedAmount(
      rows?.selectedRows?.length !== 0
        ? rows?.selectedRows?.map((row) => row.remain)?.reduce((a, b) => a + b)
        : 0
    );
    setCollectionAmount(
      rows?.selectedRows?.length !== 0
        ? rows?.selectedRows?.map((row) => row.remain)?.reduce((a, b) => a + b)
        : 0
    );
  };

  const clientHandler = (id) => {
    setClientId(id);
    console.log(id);
    fetcher(`collections/client/${id}`).then((x) => setWallet(x?.wallet));
  };

  console.log("clientId", clientId);
  console.log("wallet", wallet);

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Hotel",
      selector: (row) => row.brand,
      sortable: true,
    },
    {
      name: "Agent",
      selector: (row) => row.agent,
      sortable: true,
    },
    {
      name: "Price",
      selector: (row) => row.price,
      sortable: true,
    },
    {
      name: "Vat",
      selector: (row) => row.vat,
      sortable: true,
    },
    {
      name: "Total",
      selector: (row) => row.total_price,
      sortable: true,
    },
    // {
    //   name: "isPaid",
    //   selector: (row) => (row.isPaid === true ? "True" : "False"),
    //   sortable: true,
    // },
    {
      name: "Remain",
      selector: (row) => row.remain,
      sortable: true,
    },
  ];

  const onSubmit = (data) => {
    data.reservations_ids = res_id
      ? [res_id]
      : [...selectedRows?.map((row) => row.id)];
    data.amount = Number(collectionAmount);
    data.files = files;
    data.client_id = clientId;
    console.log("data", data);

    let postObject = new FormData();
    postObject.append("client_id", data.client_id);
    postObject.append("amount", data.amount);
    postObject.append("payment_type_id", data.payment_type_id);
    postObject.append("payment_method_id", data.payment_method_id);
    postObject.append("notes", data.notes);
    data.reservations_ids?.length == 0
      ? postObject.append("reservations_ids", [])
      : data.reservations_ids?.map((id, i) =>
        postObject.append(`reservations_ids[${i}]`, id)
      );

    files?.map((file, i) => postObject.append(`attachments[${i}]`, file));

    formPost(null, "collections/create", postObject, true);
    // .then((res) =>
    //   alert.success(
    //     "Your Collection Procces Done Successfully, and Waited for Confirmation"
    //   )
    // )
    // .catch((err) => alert.error(err?.message));
  };

  const history_columns = [
    {
      name: "Receipt ID",
      selector: (row) => row.receipt_id,
      sortable: true,
    },
    {
      name: "Amount",
      selector: (row) => row.amount,
      sortable: true,
    },
    {
      name: "Notes",
      selector: (row) => row.notes,
      sortable: true,
    },
    {
      name: "Created At",
      selector: (row) => row.created_at,
      sortable: true,
    },
  ];

  useEffect(() => {
    fetcher(`collections/reservation/${res_id}/previous_collections`).then(
      (res) => console.log(res)
    );
  }, []);

  console.log(errors);

  return (
    <>
      <div className="container">
        <h1>New Collection</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group row">
            <div className="col-md-4 col-sm-12 mb-3">
              <label className="filter-lable">Clients</label>
              {client_id ? (
                <p>{client?.name}</p>
              ) : (
                <Controller
                  control={control}
                  name="client_id"
                  {...register(`client_id`, {
                    required: true,
                  })}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      placeholder="Select Client "
                      // value={{
                      //   value: clientType,
                      //   label: clientTypes?.find((type) => type.id == clientType)
                      //     ?.type,
                      // }}
                      isMulti={false}
                      isClearable={true}
                      options={clients?.map((c) => ({
                        value: c.id,
                        label: c.name,
                      }))}
                      classNamePrefix="Select"
                      required
                      onChange={(e) => {
                        console.log("client id", e.value);
                        onChange(e.value);
                        clientHandler(e.value);
                      }}
                    />
                  )}
                />
              )}
              {errors[`client_id`] && (
                <span className="error">This field is required</span>
              )}
            </div>

            <div className="col-md-4 col-sm-12 mb-3">
              <label className="filter-lable">Payment Type</label>
              <Controller
                control={control}
                name="payment_type_id"
                {...register(`payment_type_id`, {
                  required: true,
                })}
                render={({ field: { onChange, value } }) => (
                  <Select
                    placeholder="Select Payment Type "
                    isMulti={false}
                    isClearable={true}
                    options={paymentTypes?.map((p) => ({
                      value: p.id,
                      label: p.type,
                    }))}
                    classNamePrefix="Select"
                    required
                    onChange={(e) => {
                      onChange(e.value);
                    }}
                  />
                )}
              />
              {errors[`payment_type_id`] && (
                <span className="error">This field is required</span>
              )}
            </div>
            <div className="col-md-4 col-sm-12 mb-3">
              <label className="filter-lable">Payment Methods</label>
              <Controller
                control={control}
                name="payment_method_id"
                {...register(`payment_method_id`, {
                  required: true,
                })}
                render={({ field: { onChange, value } }) => (
                  <Select
                    placeholder="Select Payment Method "
                    isMulti={false}
                    isClearable={true}
                    options={paymentMethods
                      ?.filter((p) => p.isActive === true)
                      ?.map((p) => ({
                        value: p.id,
                        label: p.title,
                      }))}
                    classNamePrefix="Select"
                    required
                    onChange={(e) => {
                      onChange(e.value);
                    }}
                  />
                )}
              />
              {errors[`payment_method_id`] && (
                <span className="error">This field is required</span>
              )}
            </div>
            <div className="col-md-4 col-sm-12">
              <label className="filter-lable">Collection Amount</label>
              <input
                className="form-control"
                type="number"
                id="amount"
                value={collectionAmount}
                // min={selectedAmount}
                min={1}
                {...register(`amount`, {
                  required: true,
                  min: 1,
                })}
                onChange={(e) => {
                  setCollectionAmount(e?.target?.value);
                }}
              />
              {errors[`amount`] && (
                <span className="error">This field is required</span>
              )}
            </div>
            <div className="col-md-4 col-sm-12">
              <label className="filter-lable" htmlFor="wallet">
                Wallet
              </label>
              <p className="mt-1" name="wallet">
                {wallet
                  ? Math.sign(wallet) === 1
                    ? wallet - Number(collectionAmount)
                    : wallet + Number(collectionAmount)
                  : 0}
              </p>
            </div>
            {!res_id && (
              <div className="col-md-4 col-sm-12">
                <label className="filter-lable" htmlFor="due">
                  Selected Total Amount
                </label>
                <p className="mt-1" name="due">
                  {selectedAmount}
                </p>
              </div>
            )}
            <div className="col-12">
              <label className="filter-lable">Notes</label>
              <textarea
                className="form-control"
                id="notes"
                rows="4"
                {...register(`notes`)}
              ></textarea>
            </div>
          </div>

          {clientId && !res_id && (
            <FetchedTable
              columns={columns}
              title="Reservations"
              target={`collections/client/${clientId}`}
              selectableRows={true}
              handleSelected={handleSelected}
              isActive={false}
              x="collections"
         
            />
          )}
          {res_id && (
            <>
              <h1>Reservation</h1>
              <Table
                columns={columns}
                data={reservation}
                // title="Reservation"
                search={false}
                navigateLink={false}
                isActive={false}
                x="collections"
           
              />

              <FetchedTable
                columns={history_columns}
                title="Previous History"
                target={`collections/reservation/${res_id}/previous_collections`}
                isActive={false}
              />
            </>
          )}

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
                      onClick={() => deleteAttach(file.name)}
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

          <div className="d-flex justify-content-center my-5">
            <button className="btn bg-gold save w-50" type="submit">
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateCollections;
