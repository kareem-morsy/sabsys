// import RequestContext from "../../../Context/RequestContext";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Profile from "../../../Components/Profile/Profile";
import { getUserById } from "../../../Services/Users";
import { useAlert } from "react-alert";
import { getClients } from "../../../Services/Clients";
import { getReservations } from "../../../Services/Reservations";
import FetchDataHook from "../../../customHooks/fetchDataHook";
import useToken from "../../../customHooks/useToken";
import fetcher from "../../../Services/fetcher";
const User = () => {
  const { userId } = useParams();
  // const { Clients, Reservations } = useContext(RequestContext);
  const [Clients, setClients] = useState([]);
  const [Reservations, setReservations] = useState([]);
  const [perPage, setPerPage] = useState(10);
  const { items, totalRows, fetchData } = FetchDataHook();
  const [ERROR, setError] = useState();
  const [refreshState, setRefreshState] = useState(null);

  const Refresh = (state) => {
    setRefreshState(state);
  };
  const { token } = useToken();
  useEffect(() => {
    fetcher(`clients`)
      .then((data) => {
        if (data !== undefined) {
          setClients(data.data);
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);
  useEffect(() => {
    fetchData("reservations", 1, 1000);
  }, [perPage, refreshState]);
  const handlePageChange = (page) => {
    fetchData("reservations", page, 1000);
  };
  const handlePerRowsChange = async (newPerPage, page) => {
    setPerPage(newPerPage);
  };
  useEffect(() => {
    fetcher(`reservations`)
      .then((data) => {
        if (data !== undefined) {
          setReservations(data.data);
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);
  const [user, setUser] = useState();
  // const data = reservation?.filter((res) => res.user_id === user?.id);
  const alert = useAlert();

  console.log(user);

  useEffect(() => {
    if (userId) {
      fetcher(`users/${userId}`)
        .then((data) => {
          if (data !== undefined) {
            setUser(data.data);
          }
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  }, [userId]);

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Client",
      selector: (row) => Clients?.find((c) => c.id === row.client_id)?.name,
      sortable: true,
    },
  ];

  return (
    <Profile
      person={user}
      data={items?.filter((res) => res.agent_id == userId)}
      columns={columns}
      targetId={userId}
      filterBy="client"
      navigateLink="reservations"
      editLink="users"
    />
  );
};

export default User;
