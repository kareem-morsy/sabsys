import React, { useState } from "react";
import Switch from "react-switch";
import useToken from "../../customHooks/useToken";
import FetchedTable from "../../Components/FetchedTable";
import { editVat } from "../../Services/Vat";
import { Modal } from "react-bootstrap";
import { useAlert } from "react-alert";

function Clients() {
  const [refresh, setRefresh] = useState(false);
  const { permissions } = useToken();
  const [showPopup, setShowPopup] = useState(false);
  const [id, setID] = useState();
  const [vat, setVat] = useState();
  const alert = useAlert();

  const handleClose = () => setShowPopup(false);

  const handleChange = (id, vat) => {
    setShowPopup(true);
    setID(id);
    setVat(vat);
  };

  const ChangeState = () => {
    editVat("clients", id, vat === true ? 0 : 1)
      .then((res) => {
        setVat(res?.data?.isVat);
        console.log("response", res);
        alert.success("Status Changed Successfully");
        setShowPopup(false);
        setRefresh(!refresh);
      })
      .catch((err) => {
        console.log("error", err);
        alert.error("error");
      });
  };

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
      width: "100px",
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Type",
      selector: (row) => row.type?.name,
      sortable: true,
    },
    {
      name: "Vat",
      cell: (e) => (
        <Switch
          id={e.id}
          onChange={() => handleChange(e.id, e.isVat)}
          checked={e.isVat}
          onColor="#c99822"
        />
      ),
      center: true,
      width: "100px",
    },
  ];

  return (
    <>
      <Modal show={showPopup} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div className="p-5 text-center">
            <h3 className="popup">
              Are you sure you want to change vat status ?!
            </h3>
            <button className="btn bg-gold mt-5" onClick={ChangeState}>
              Change
            </button>
          </div>
        </Modal.Body>
      </Modal>
      <FetchedTable
        columns={columns}
        title="All Clients"
        button="Create Client"
        target="clients"
        navigateUrl="clients"
        permissions={permissions}
        edit="clients"
        role="clients-create"
        refresh={refresh}
      />
    </>
  );
}
export default Clients;
