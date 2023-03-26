import React, { useState, createContext, useEffect } from "react";

import navbar from "../Data/navbar";
import paymentDetails from "../Data/paymentDetails";
import { getHotels, getRoomMatrix, getHotelsList } from "../Services/Hotels";
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
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [Roles, setRoles] = useState([]);
  const [Payments, setPayments] = useState([]);
  const [Countries, setCountries] = useState([]);
  const [Cities, setCities] = useState([]);
  const [Clients, setClients] = useState([]);
  const [ClientTypes, setClientTypes] = useState([]);
  const [Hotels, setHotels] = useState([]);
  const [HotelsList, setHotelsList] = useState([]);
  const [RoomMatrix, setRoomMatrix] = useState([]);
  const [Users, setUsers] = useState([]);
  const [Banks, setBanks] = useState([]);
  const [Permissions, setPermissions] = useState([]);
  const [autUser, setAutUser] = useState([]);
  const { token } = useToken();
  const [ERROR, setError] = useState();
  const [refreshState, setRefreshState] = useState(null);

  const Refresh = (state) => {
    setRefreshState(state);
  };

  // const [clientTypesRefresh, setClientTypesRefresh] = useState(true);
  // const [banksRefresh, setBanksRefresh] = useState(true);
  // const [roomsRefresh, setRoomsRefresh] = useState(true);
  // const [citiesRefresh, setCitiesRefresh] = useState(true);
  // const [clientsRefresh, setClientRefresh] = useState(true);
  // const [rolesRefresh, setRolesRefresh] = useState(true);
  // const [extrasRefresh, setExtrasRefresh] = useState(true);
  // const [hotelsRefresh, setHotelsRefresh] = useState(true);
  // const [mealsRefresh, setMealsRefresh] = useState(true);
  // const [roomTypesRefresh, setRoomTypesRefresh] = useState(true);
  // const [roomViewsRefresh, setRoomViewsRefresh] = useState(true);
  // const [extraTypesRefresh, setExtraTypesRefresh] = useState(true);
  // const [usersRefresh, setUsersRefresh] = useState(true);
  // const [reservationsRefresh, setReservationsRefresh] = useState(true);

  // const ClientTypeRefresh = () => {
  //   setClientTypesRefresh(!clientTypesRefresh);
  // };
  // const RoomTypesRefresh = () => {
  //   setRoomTypesRefresh(!roomTypesRefresh);
  // };
  // const RoomViewsRefresh = () => {
  //   setRoomViewsRefresh(!roomViewsRefresh);
  // };
  // const ExtraTypesRefresh = () => {
  //   setExtraTypesRefresh(!extraTypesRefresh);
  // };
  // const BanksRefresh = () => {
  //   setBanksRefresh(!banksRefresh);
  // };
  // const RoomsRefresh = () => {
  //   setRoomsRefresh(!roomsRefresh);
  // };
  // const CitiesRefresh = () => {
  //   setCitiesRefresh(!citiesRefresh);
  // };
  // const ClientsRefresh = () => {
  //   setClientRefresh(!clientsRefresh);
  // };
  // const RolesRefresh = () => {
  //   setRolesRefresh(!rolesRefresh);
  // };
  // const ExtrasRefresh = () => {
  //   setExtrasRefresh(!extrasRefresh);
  // };
  // const HotelsRefresh = () => {
  //   setHotelsRefresh(!hotelsRefresh);
  // };
  // const MealsRefresh = () => {
  //   setMealsRefresh(!mealsRefresh);
  // };

  // const UsersRefresh = () => {
  //   setUsersRefresh(!usersRefresh);
  // };

  // const ReservationsRefresh = () => {
  //   setReservationsRefresh(!reservationsRefresh);
  // };

  useEffect(async () => {
    switch (refreshState) {
      case "hotels":
        getHotels()
          .then((data) => {
            if (data !== undefined) {
              setHotels(data.data);
            }
          })
          .catch((error) => {
            setError(error.message);
          });
        getHotelsList()
          .then((data) => {
            if (data !== undefined) {
              setHotelsList(data.data);
            }
          })
          .catch((error) => {
            setError(error.message);
          });

      case "cities":
        getCities()
          .then((data) => {
            if (data !== undefined) {
              setCities(data.data);
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

      case "clients":
        getClients()
          .then((data) => {
            if (data !== undefined) {
              setClients(data.data);
            }
          })
          .catch((error) => {
            setError(error.message);
          });

      case "client-types":
        getClientTypes()
          .then((data) => {
            if (data !== undefined) {
              setClientTypes(data.data);
            }
          })
          .catch((error) => {
            setError(error.message);
          });

      case "banks":
        getBanks()
          .then((data) => {
            if (data !== undefined) {
              setBanks(data.data);
            }
          })
          .catch((error) => {
            setError(error.message);
          });

      case "rooms":
        getRooms()
          .then((data) => {
            if (data !== undefined) {
              setRooms(data.data);
            }
          })
          .catch((error) => {
            setError(error.message);
          });

      case "roles":
        getRoles()
          .then((data) => {
            if (data !== undefined) {
              setRoles(data.data);
            }
          })
          .catch((error) => {
            setError(error.message);
          });

      case "extras":
        getExtras()
          .then((data) => {
            if (data !== undefined) {
              setExtras(data.data);
            }
          })
          .catch((error) => {
            setError(error.message);
          });

      case "meals":
        getMeals()
          .then((data) => {
            if (data !== undefined) {
              setMeals(data.data);
            }
          })
          .catch((error) => {
            setError(error.message);
          });

      case "room-types":
        getRoomTypes()
          .then((data) => {
            if (data !== undefined) {
              setRoomTypes(data.data);
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

      case "room-views":
        getRoomViews()
          .then((data) => {
            if (data !== undefined) {
              setRoomViews(data.data);
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

      case "extra-types":
        getExtraTypes()
          .then((data) => {
            if (data !== undefined) {
              setExtraTypes(data.data);
            }
          })
          .catch((error) => {
            setError(error.message);
          });

      case "users":
        getUsers()
          .then((data) => {
            if (data !== undefined) {
              setUsers(data.data);
            }
          })
          .catch((error) => {
            setError(error.message);
          });

      case "languages":
        getLanguages()
          .then((data) => {
            if (data !== undefined) {
              setLang(data.data);
            }
          })
          .catch((error) => {
            setError(error.message);
          });

      case "reservations":
        getReservations()
          .then((data) => {
            if (data !== undefined) {
              setReservations(data.data);
            }
          })
          .catch((error) => {
            setError(error.message);
          });

      default:
        return;
    }
  }, [refreshState]);

  useEffect(async () => {
    if (token) {
      getHotels()
        .then((data) => {
          console.log(data.data);
          if (data !== undefined) {
            setHotels(data.data);
          }
        })
        .catch((error) => {
          setError(error.message);
        });
      getHotelsList()
        .then((data) => {
          if (data !== undefined) {
            console.log("getHotelsList", data);
            setHotelsList(data.data);
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

      getCountries()
        .then((data) => {
          if (data !== undefined) {
            setCountries(data.data);
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

      getRoles()
        .then((data) => {
          if (data !== undefined) {
            console.log("rollzzz", data);
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

      getRoomMatrix()
        .then((data) => {
          if (data !== undefined) {
            setRoomMatrix(data.data);
          }
        })
        .catch((error) => {
          setError(error.message);
        });

      getExtraTypes()
        .then((data) => {
          if (data !== undefined) {
            console.log("getExtraTypes", data.data);
            setExtraTypes(data.data);
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

      getReservations()
        .then((data) => {
          if (data !== undefined) {
            setReservations(data.data);
          }
        })
        .catch((error) => {
          setError(error.message);
        });

      getPaymentMethods()
        .then((data) => {
          if (data !== undefined) {
            setPayments(data.data);
            setPaymentMethods(data.data);
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
  }, [token]);

  return (
    <RequestContext.Provider
      value={{
        autUser,
        Hotels,
        HotelsList,
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
        refreshState,
        Refresh,
        // ClientTypeRefresh,
        // BanksRefresh,
        // RoomsRefresh,
        // CitiesRefresh,
        // ClientsRefresh,
        // RolesRefresh,
        // HotelsRefresh,
        // ExtrasRefresh,
        // MealsRefresh,
        // RoomTypesRefresh,
        // RoomViewsRefresh,
        // ExtraTypesRefresh,
        // UsersRefresh,
        // ReservationsRefresh,
      }}
    >
      {props.children}
    </RequestContext.Provider>
  );
};
export default RequestContext;
