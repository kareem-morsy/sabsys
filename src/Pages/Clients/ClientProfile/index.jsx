import RequestContext from "../../../Context/RequestContext";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Profile from "../../../Components/Profile/Profile";
import { getClientById } from "../../../Services/Clients";
import { useAlert } from "react-alert";
import { getUsers } from "../../../Services/Users";
import { getReservations } from "../../../Services/Reservations";
import FetchDataHook from "../../../customHooks/fetchDataHook";
import useToken from "../../../customHooks/useToken";
import fetcher from "../../../Services/fetcher";

const Client = () => {
  const { clientId } = useParams();
  // const { Reservations, Users } = useContext(RequestContext);
  const [Reservations, setReservations] = useState([]);
  const [Users, setUsers] = useState([]);
  const [client, setClient] = useState();
  const alert = useAlert();
  const [ERROR, setError] = useState();
  // const [refreshState, setRefreshState] = useState(null);
  // const [perPage, setPerPage] = useState(10);
  const { items, totalRows, fetchData, paginationn } = FetchDataHook();
  // const [filterText, setFilterText] = useState("");
  // const [currentPage, setCurrentPage] = useState(1);
  // const [state, setState] = useState(1);

  // const Refresh = (state) => {
  //   setRefreshState(state);
  // };
  // const { token ,permissions } = useToken();
  // const handlleFilterSearch=(e)=>{
  //   setFilterText(e.target.value)
  // }
  console.log("clientclient", client);
  useEffect(() => {
    fetcher("users")
      .then((data) => {
        if (data !== undefined) {
          setUsers(data.data);
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);
  //   useEffect(() => {
  //     setCurrentPage(paginationn?.currentPage)
  //   }, [paginationn?.currentPage]);
  //   useEffect(() => {
  //     fetchData(`clients/${clientId}/reservations`, paginationn?.currentPage , perPage,filterText);
  //   }, [currentPage, refreshState,filterText]);
  //   const handleFilteredItems = ()=>{
  //     fetchData(`clients/${clientId}/reservations`,paginationn?.currentPage,10,filterText)
  //    }
  //    useEffect(() => {
  //      handleFilteredItems()
  //  },[filterText])
  //   const handlePageChange = (page) => {
  //     fetchData(`clients/${clientId}/reservations`, page, perPage, filterText);
  //   };
  //   const handlePerRowsChange = async (newPerPage, page) => {
  //     setPerPage(newPerPage);
  //   };

  useEffect(() => {
    if (clientId) {
      fetcher(`clients/${clientId}`)
        .then((data) => {
          if (data !== undefined) {
            setClient(data?.data);
          }
        })
        .catch((error) => {
          alert.error(error.message);
        });
    }
  }, [clientId]);

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "User",
      selector: (row) => Users?.find((u) => u.id === row.agent_id)?.name,
      sortable: true,
    },
  ];
  useEffect(() => {
    console.log("Reservations", items);
  }, []);

  console.log(client);

  return (
    <Profile
      person={client}
      data={items?.filter((res) => res.client_id == clientId)}
      targetId={clientId}
      columns={columns}
      filterBy="agent"
      navigateLink="reservations"
      editLink="clients"
      // permissions={permissions}
    />
  );
};

export default Client;
