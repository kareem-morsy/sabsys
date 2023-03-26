import React, { useState, createContext, useEffect } from "react";

import navbar from "../Data/navbar";
// import reservation from "../Data/reservation";
import paymentDetails from "../Data/paymentDetails";
// import paymentMethods from "../Data/paymentMethods";
// import countries from "../Data/countries";
import { getHotels, getRoomMatrix } from "../Services/Hotels";
import { getCities } from "../Services/Cities";
import { getClients } from "../Services/Clients";
import { getUsers } from "../Services/Users";
import { getExtras } from "../Services/Extras";
import { getExtraTypes } from "../Services/ExtraTypes";
import { getRoles } from "../Services/Roles";
import { getMeals } from "../Services/Meals";
import { getLanguages } from "../Services/Languages";
import { getRoomTypes } from "../Services/RoomTypes";
import { getRoomViews } from "../Services/RoomViews";
import { getRooms } from "../Services/Rooms";
import { getCountries } from "../Services/Countries";
import { getBanks } from "../Services/Banks";
import { getClientTypes } from "../Services/ClientTypes";
import { getPermissions } from "../Services/Permissions";
import { getPaymentMethods } from "../Services/PaymentMethods";
import { getReservations } from "../Services/Reservations";
import useToken from "../customHooks/useToken";
// import { useAlert } from 'react-alert'

const RequestContext = createContext();

export const RequestContextProvider = (props) => {
  const [Languages, setLang] = useState([]);
  const [Meals, setMeals] = useState([]);
  const [Reservations, setReservations] = useState([]);
  const [Extras, setExtras] = useState([]);
  const [ExtraTypes, setExtraTypes] = useState([]);
  const [RoomTypes, setRoomTypes] = useState([]);
  const [RoomViews, setRoomViews] = useState([]);
  const [Rooms, setRooms] = useState([]);
  const [Departments, setDepartments] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [Roles, setRoles] = useState([]);
  const [Payments, setPayments] = useState([]);
  const [Countries, setCountries] = useState([]);
  const [Cities, setCities] = useState([]);
  const [Clients, setClients] = useState([]);
  const [ClientTypes, setClientTypes] = useState([]);
  const [Hotels, setHotels] = useState([]);
  const [RoomMatrix, setRoomMatrix] = useState([]);
  const [Users, setUsers] = useState([]);
  const [Banks, setBanks] = useState([]);
  const [Permissions, setPermissions] = useState([]);
  const [autUser, setAutUser] = useState([]);
  const { token } = useToken();
  const [state, setState] = useState(true);
  const [ERROR, setError] = useState();

  const Refresh = () => {
    console.log("inside refresh");
    state === true ? setState(false) : setState(true);
    console.log(state);
  };

  useEffect(async () => {
    if (token) {
      getHotels()
        .then((data) => {
          if (data !== undefined) {
            setHotels(data.data);
          }
        })
        .catch((error) => {
          setError(error.message);
        });

      console.log("refresh inside");
      getClientTypes()
        .then((data) => {
          if (data !== undefined) {
            setClientTypes(data.data);
          }
        })
        .catch((error) => {
          setError(error.message);
          console.log("error.message", error.message);
        });
      getPaymentMethods()
        .then((data) => {
          console.log(data.data);
          if (data !== undefined) {
            setPaymentMethods(data.data);
            // setPayments(data.data);
          }
        })
        .catch((error) => {
          setError(error.message);
          console.log("error.message", error.message);
        });

      getBanks()
        .then((data) => {
          if (data !== undefined) {
            setBanks(data.data);
          }
        })
        .catch((error) => {
          setError(error.message);
        });

      getRooms()
        .then((data) => {
          if (data !== undefined) {
            setRooms(data.data);
          }
        })
        .catch((error) => {
          setError(error.message);
        });

      getCities()
        .then((data) => {
          if (data !== undefined) {
            setCities(data.data);
          }
        })
        .catch((error) => {
          setError(error.message);
        });

      getClients()
        .then((data) => {
          if (data !== undefined) {
            setClients(data.data);
          }
        })
        .catch((error) => {
          setError(error.message);
        });
      getRoles()
        .then((data) => {
          if (data !== undefined) {
            setRoles(data.data);
          }
        })
        .catch((error) => {
          setError(error.message);
        });
      getExtras()
        .then((data) => {
          if (data !== undefined) {
            setExtras(data.data);
          }
        })
        .catch((error) => {
          setError(error.message);
        });
      getMeals()
        .then((data) => {
          if (data !== undefined) {
            setMeals(data.data);
          }
        })
        .catch((error) => {
          setError(error.message);
        });
      getLanguages()
        .then((data) => {
          if (data !== undefined) {
            setLang(data.data);
          }
        })
        .catch((error) => {
          setError(error.message);
        });
      getRoomTypes()
        .then((data) => {
          if (data !== undefined) {
            setRoomTypes(data.data);
          }
        })
        .catch((error) => {
          setError(error.message);
        });

      getRoomViews()
        .then((data) => {
          if (data !== undefined) {
            setRoomViews(data.data);
          }
        })
        .catch((error) => {
          setError(error.message);
        });

      getUsers()
        .then((data) => {
          if (data !== undefined) {
            setUsers(data.data);
          }
        })
        .catch((error) => {
          setError(error.message);
        });

      getRoomMatrix()
        .then((data) => {
          if (data !== undefined) {
            setRoomMatrix(data.data);
          }
        })
        .catch((error) => {
          setError(error.message);
        });

      getCountries()
        .then((data) => {
          if (data !== undefined) {
            setCountries(data.data);
          }
        })
        .catch((error) => {
          setError(error.message);
        });
      getExtraTypes()
        .then((data) => {
          if (data !== undefined) {
            setExtraTypes(data.data);
          }
        })
        .catch((error) => {
          setError(error.message);
        });

      getReservations()
        .then((data) => {
          if (data !== undefined) {
            setReservations(data.data);
          }
        })
        .catch((error) => {
          setError(error.message);
        });

      getPermissions()
        .then((data) => {
          if (data !== undefined) {
            setPermissions(data.data);
          }
        })
        .catch((error) => {
          setError(error.message);
        });
    }
  }, [token, state]);

  return (
    <RequestContext.Provider
      value={{
        autUser,
        Hotels,
        RoomMatrix,
        Clients,
        Rooms,
        RoomViews,
        RoomTypes,
        Roles,
        Users,
        Meals,
        ExtraTypes,
        Extras,
        navbar,
        Reservations,
        paymentDetails,
        paymentMethods,
        Countries,
        Cities,
        Languages,
        Banks,
        ClientTypes,
        Permissions,
        Reservations,
        Payments,
        ERROR,
        Refresh,
      }}
    >
      {props.children}
    </RequestContext.Provider>
  );
};
export default RequestContext;
