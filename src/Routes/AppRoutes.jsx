import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Users from "../Pages/Users/Agents";
import User from "../Pages/Users/UserProfile";
// import Nav from "../Components/Layout/Navbar";
import Meals from "../Pages/Meals";
import NewMeal from "../Pages/Meals/Create";
import NewExtra from "../Pages/Extras/Create";
import Hotels from "../Pages/Hotels";
import NewHotel from "../Pages/Hotels/Create";
import HotelDetails from "../Pages/HotelDetails";
import Rooms from "../Pages/Rooms";
import RoomTypes from "../Pages/Rooms/RoomTypes";
import NewRoomType from "../Pages/Rooms/RoomTypes/Create";
import RoomViews from "../Pages/Rooms/RoomViews";
import NewRoomView from "../Pages/Rooms/RoomViews/Create";
import Extras from "../Pages/Extras";
import ExtraTypes from "../Pages/Extras/ExtraTypes";
import NewExtraType from "../Pages/Extras/ExtraTypes/Create";
import Roles from "../Pages/Roles";
import NewRole from "../Pages/Roles/Create";
import CreateUser from "../Pages/Users/Create";
import Clients from "../Pages/Clients";
import Client from "../Pages/Clients/ClientProfile";
import ClientTypes from "../Pages/Clients/ClientTypes";
import NewClientTypes from "../Pages/Clients/ClientTypes/NewClientType";
import CreateClient from "../Pages/Clients/CreateClient";
// import Payments from "../Pages/Payments/PaymentMethods/create";
// import NewPayment from "../Pages/Payments/PaymentMethods/create";
import Cities from "../Pages/Locations/Cities";
import NewCity from "../Pages/Locations/Cities/Create";
import Countries from "../Pages/Locations/Countries";
import NewCountry from "../Pages/Locations/Countries/Create";
import Languages from "../Pages/Languages";
// import NewLanguage from "../Pages/Languages/NewLanguage";
import Reservations from "../Pages/Reservations/Reservations";
import ReservationDetails from "../Pages/Reservations/ReservationDetails";
import Settings from "../Pages/SettingsPage";
import LoginForm from "../Pages/Login/LoginForm";
import PrivateRoutes from "./PrivateRoutes";
import Banks from "../Pages/Banks";
import NewBank from "../Pages/Banks/Create";
import EditBank from "../Pages/Banks/Edit";
import NotificationsList from "../Pages/NotificationsList";
import DownloadsCenter from "../Pages/Reports/DownloadCenter";
import CreateReservation from "../Pages/Reservations/Create/index";
import EditClient from "../Pages/Clients/EditClient";
import EditHotel from "../Pages/Hotels/Edit";
import EditRole from "../Pages/Roles/Edit";
import EditUser from "../Pages/Users/EditUser";
import EditClientType from "../Pages/Clients/ClientTypes/EditClientType/index.js";
import NewCollection from "../Pages/Transactions/Collections/Create";
import Statment from "../Pages/Clients/Statment";
import StatmentDetails from "../Pages/Clients/Statment/StatmentDetails";
import EditReservation from "../Pages/Reservations/Edit";

const AppRoutes = ({
  token,
  show,
  user,
  permissions,
  generateAsyncUrlGetter,
  sendNotification,
  currentSocketUrl,
  setCurrentSocketUrl,
  messageHistory,
  setMessageHistory,
  sendMessage,
  lastMessage,
  readyState,
}) => {
  return (
    <Routes>
      <Route path="/login" element={!token ? <LoginForm /> : <Dashboard />} />
      <Route path="/" element={<Dashboard />} />

      <Route
        path="/reservations"
        element={
          <PrivateRoutes
            redirectPath="/"
            isAllowed={permissions?.find(
              (permission) => permission === "reservation-read"
            )}
          >
            <Reservations />
          </PrivateRoutes>
        }
      />
      <Route
        path="/reservations/:resId"
        element={
          <PrivateRoutes
            redirectPath="/"
            isAllowed={permissions?.find(
              (permission) => permission === "reservation-read"
            )}
          >
            <ReservationDetails />
          </PrivateRoutes>
        }
      />
      <Route
        path="/reservations/create"
        element={
          <PrivateRoutes
            redirectPath="/"
            isAllowed={permissions?.find(
              (permission) => permission === "reservation-create"
            )}
          >
            <CreateReservation />
          </PrivateRoutes>
        }
      />
      <Route
        path="/reservations/edit/:resId"
        element={
          <PrivateRoutes
            redirectPath="/"
            isAllowed={permissions?.find(
              (permission) => permission === "reservation-update"
            )}
          >
            <EditReservation />
          </PrivateRoutes>
        }
      />

      <Route
        path="/hotels"
        element={
          <PrivateRoutes
            redirectPath="/"
            isAllowed={permissions?.find(
              (permission) => permission === "hotels-read"
            )}
          >
            <Hotels />
          </PrivateRoutes>
        }
      />
      <Route
        path="/hotels/:hotelId"
        element={
          <PrivateRoutes
            redirectPath="/"
            isAllowed={permissions?.find(
              (permission) => permission === "hotels-read"
            )}
          >
            <HotelDetails />
          </PrivateRoutes>
        }
      />
      <Route
        path="/hotels/create"
        element={
          <PrivateRoutes
            redirectPath="/"
            isAllowed={permissions?.find(
              (permission) => permission === "hotels-create"
            )}
          >
            <NewHotel />
          </PrivateRoutes>
        }
      />
      <Route
        path="/hotels/edit/:hotelId"
        element={
          <PrivateRoutes
            redirectPath="/"
            isAllowed={permissions?.find(
              (permission) => permission === "hotels-update"
            )}
          >
            <EditHotel />
          </PrivateRoutes>
        }
      />

      <Route
        path="/rooms"
        element={
          <PrivateRoutes
            redirectPath="/"
            isAllowed={permissions?.find(
              (permission) => permission === "rooms-read"
            )}
          >
            <Rooms />
          </PrivateRoutes>
        }
      />

      <Route
        path="/clients"
        element={
          <PrivateRoutes
            redirectPath="/"
            isAllowed={permissions?.find(
              (permission) => permission === "clients-read"
            )}
          >
            <Clients />
          </PrivateRoutes>
        }
      />
      <Route
        path="/clients/:clientId"
        element={
          <PrivateRoutes
            redirectPath="/"
            isAllowed={permissions?.find(
              (permission) => permission === "clients-read"
            )}
          >
            <Client />
          </PrivateRoutes>
        }
      />

      <Route path="/clients/:clientId/statment" element={<Statment />} />
      <Route
        path="/clients/:clientId/statment/:id"
        element={<StatmentDetails />}
      />
      <Route
        path="/clients/create"
        element={
          <PrivateRoutes
            redirectPath="/"
            isAllowed={permissions?.find(
              (permission) => permission === "clients-create"
            )}
          >
            <CreateClient />
          </PrivateRoutes>
        }
      />
      <Route
        path="/clients/edit/:id"
        element={
          <PrivateRoutes
            redirectPath="/"
            isAllowed={permissions?.find(
              (permission) => permission === "clients-update"
            )}
          >
            <EditClient />
          </PrivateRoutes>
        }
      />

      <Route
        path="/clients/client-types"
        element={
          <PrivateRoutes
            redirectPath="/"
            isAllowed={permissions?.find(
              (permission) => permission === "client-types-read"
            )}
          >
            <ClientTypes />
          </PrivateRoutes>
        }
      />
      <Route
        path="/clients/client-types/create"
        element={
          <PrivateRoutes
            redirectPath="/"
            isAllowed={permissions?.find(
              (permission) => permission === "client-types-create"
            )}
          >
            <NewClientTypes />
          </PrivateRoutes>
        }
      />
      <Route
        path="/clients/client-types/edit/:ClientTypeId"
        element={
          <PrivateRoutes
            redirectPath="/"
            isAllowed={permissions?.find(
              (permission) => permission === "client-types-update"
            )}
          >
            <EditClientType />
          </PrivateRoutes>
        }
      />
      <Route
        path="/users"
        element={
          <PrivateRoutes
            redirectPath="/"
            isAllowed={permissions?.find(
              (permission) => permission === "users-read"
            )}
          >
            <Users />
          </PrivateRoutes>
        }
      />
      <Route
        path="/users/:userId"
        element={
          <PrivateRoutes
            redirectPath="/"
            isAllowed={permissions?.find(
              (permission) => permission === "users-read"
            )}
          >
            <User />
          </PrivateRoutes>
        }
      />
      <Route
        path="/users/create"
        element={
          <PrivateRoutes
            redirectPath="/"
            isAllowed={permissions?.find(
              (permission) => permission === "users-create"
            )}
          >
            <CreateUser />
          </PrivateRoutes>
        }
      />
      <Route
        path="/users/edit/:id"
        element={
          <PrivateRoutes
            redirectPath="/"
            isAllowed={permissions?.find(
              (permission) => permission === "users-update"
            )}
          >
            <EditUser />
          </PrivateRoutes>
        }
      />

      <Route path="/settings/:userId" element={<Settings />} />
      <Route
        path="/roles"
        element={
          <PrivateRoutes
            redirectPath="/"
            isAllowed={permissions?.find(
              (permission) => permission === "roles-read"
            )}
          >
            <Roles />
          </PrivateRoutes>
        }
      />
      <Route
        path="/roles/create"
        element={
          <PrivateRoutes
            redirectPath="/"
            isAllowed={permissions?.find(
              (permission) => permission === "roles-create"
            )}
          >
            <NewRole />
          </PrivateRoutes>
        }
      />
      <Route
        path="/roles/edit/:roleId"
        element={
          <PrivateRoutes
            redirectPath="/"
            isAllowed={permissions?.find(
              (permission) => permission === "roles-update"
            )}
          >
            <EditRole />
          </PrivateRoutes>
        }
      />
      <Route
        path="/banks"
        element={
          <PrivateRoutes
            redirectPath="/"
            isAllowed={permissions?.find(
              (permission) => permission === "banks-read"
            )}
          >
            <Banks />
          </PrivateRoutes>
        }
      />
      <Route
        path="/banks/create"
        element={
          <PrivateRoutes
            redirectPath="/"
            isAllowed={permissions?.find(
              (permission) => permission === "banks-create"
            )}
          >
            <NewBank
              generateAsyncUrlGetter={generateAsyncUrlGetter}
              sendNotification={sendNotification}
              currentSocketUrl={currentSocketUrl}
              setCurrentSocketUrl={setCurrentSocketUrl}
              messageHistory={messageHistory}
              setMessageHistory={setMessageHistory}
              sendMessage={sendMessage}
              lastMessage={lastMessage}
              readyState={readyState}
            />
          </PrivateRoutes>
        }
      />
      <Route
        path="/banks/edit/:bankId"
        element={
          <PrivateRoutes
            redirectPath="/"
            isAllowed={permissions?.find(
              (permission) => permission === "banks-read"
            )}
          >
            <EditBank />
          </PrivateRoutes>
        }
      />

      <Route
        path="/languages"
        element={
          <PrivateRoutes
            redirectPath="/"
            isAllowed={permissions?.find(
              (permission) => permission === "languages-read"
            )}
          >
            <Languages />
          </PrivateRoutes>
        }
      />

      {/* <Route path="/payments" element={<Payments />} />
      <Route path="/payments/create" element={<NewPayment />} />
      <Route path="/payments/edit/:paymentId" element={<NewPayment />} />
      <Route path="/collections" element={<Collections />} /> */}
      <Route path="/collections/create" element={<NewCollection />} />
      {/* <Route
        path="/collections/edit/:collectionId"
        element={<CollectionDetails />}
      /> */}

      <Route path="/notifications" element={<NotificationsList />} />
      {/* <Route path="/reports" element={<Reports />} /> */}
      <Route path="/reports/downloadcenter" element={<DownloadsCenter />} />
      {/* <Route
        path="/meals"
        element={
          <PrivateRoutes
            redirectPath="/"
            isAllowed={permissions?.find(
              (permission) => permission === "meals-read"
            )}
          >
            <Meals />
          </PrivateRoutes>
        }
      />
      <Route
        path="/meals/create"
        element={
          <PrivateRoutes
            redirectPath="/"
            isAllowed={permissions?.find(
              (permission) => permission === "meals-create"
            )}
          >
            <NewMeal />
          </PrivateRoutes>
        }
      />
      <Route
        path="/meals/edit/:mealId"
        element={
          <PrivateRoutes
            redirectPath="/"
            isAllowed={permissions?.find(
              (permission) => permission === "meals-update"
            )}
          >
            <NewMeal />
          </PrivateRoutes>
        }
      /> */}

      {/* <Route
        path="/extra-types"
        element={
          <PrivateRoutes
            redirectPath="/"
            isAllowed={permissions?.find(
              (permission) => permission === "extra-types-read"
            )}
          >
            <ExtraTypes />
          </PrivateRoutes>
        }
      />
      <Route
        path="/create-extra-type"
        element={
          <PrivateRoutes
            redirectPath="/"
            isAllowed={permissions?.find(
              (permission) => permission === "extra-types-create"
            )}
          >
            <NewExtraType />
          </PrivateRoutes>
        }
      />
      <Route
        path="/extra-types/edit/:extraTypeId"
        element={
          <PrivateRoutes
            redirectPath="/"
            isAllowed={permissions?.find(
              (permission) => permission === "extra-types-update"
            )}
          >
            <NewExtraType />
          </PrivateRoutes>
        }
      />

      <Route
        path="/extras/edit/:extraId"
        element={
          <PrivateRoutes
            redirectPath="/"
            isAllowed={permissions?.find(
              (permission) => permission === "extras-update"
            )}
          >
            <NewExtra />
          </PrivateRoutes>
        }
      />
      <Route
        path="/extras"
        element={
          <PrivateRoutes
            redirectPath="/"
            isAllowed={permissions?.find(
              (permission) => permission === "extras-read"
            )}
          >
            <Extras />
          </PrivateRoutes>
        }
      />
      <Route
        path="/create-extra"
        element={
          <PrivateRoutes
            redirectPath="/"
            isAllowed={permissions?.find(
              (permission) => permission === "extras-create"
            )}
          >
            <NewExtra />
          </PrivateRoutes>
        }
      /> */}
      {/* 
      <Route
        path="/room-types"
        element={
          <PrivateRoutes
            redirectPath="/"
            isAllowed={permissions?.find(
              (permission) => permission === "room-types-read"
            )}
          >
            <RoomTypes />
          </PrivateRoutes>
        }
      />
      <Route
        path="/room-types/create"
        element={
          <PrivateRoutes
            redirectPath="/"
            isAllowed={permissions?.find(
              (permission) => permission === "room-types-create"
            )}
          >
            <NewRoomType />
          </PrivateRoutes>
        }
      />
      <Route
        path="/room-types/edit/:roomTypeId"
        element={
          <PrivateRoutes
            redirectPath="/"
            isAllowed={permissions?.find(
              (permission) => permission === "room-types-update"
            )}
          >
            <NewRoomType />
          </PrivateRoutes>
        }
      />

      <Route
        path="/room-views"
        element={
          <PrivateRoutes
            redirectPath="/"
            isAllowed={permissions?.find(
              (permission) => permission === "room-views-read"
            )}
          >
            <RoomViews />
          </PrivateRoutes>
        }
      />
      <Route
        path="/room-views/create"
        element={
          <PrivateRoutes
            redirectPath="/"
            isAllowed={permissions?.find(
              (permission) => permission === "room-views-create"
            )}
          >
            <NewRoomView />
          </PrivateRoutes>
        }
      />
      <Route
        path="/room-views/edit/:roomViewId"
        element={
          <PrivateRoutes
            redirectPath="/"
            isAllowed={permissions?.find(
              (permission) => permission === "room-views-update"
            )}
          >
            <NewRoomView />
          </PrivateRoutes>
        }
      /> */}
      {/* 
      <Route
        path="/countries"
        element={
          <PrivateRoutes
            redirectPath="/"
            isAllowed={permissions?.find(
              (permission) => permission === "cities-read"
            )}
          >
            <Countries />
          </PrivateRoutes>
        }
      />
      <Route
        path="/countries/create"
        element={
          <PrivateRoutes
            redirectPath="/"
            isAllowed={permissions?.find(
              (permission) => permission === "cities-create"
            )}
          >
            <NewCountry />
          </PrivateRoutes>
        }
      />
      <Route
        path="/countries/edit/:countryId"
        element={
          <PrivateRoutes
            redirectPath="/"
            isAllowed={permissions?.find(
              (permission) => permission === "cities-update"
            )}
          >
            <NewCountry />
          </PrivateRoutes>
        }
      />

      <Route
        path="/cities"
        element={
          <PrivateRoutes
            redirectPath="/"
            isAllowed={permissions?.find(
              (permission) => permission === "cities-read"
            )}
          >
            <Cities />
          </PrivateRoutes>
        }
      />
      <Route
        path="/cities/create"
        element={
          <PrivateRoutes
            redirectPath="/"
            isAllowed={permissions?.find(
              (permission) => permission === "cities-create"
            )}
          >
            <NewCity />
          </PrivateRoutes>
        }
      />
      <Route
        path="/cities/edit/:cityId"
        element={
          <PrivateRoutes
            redirectPath="/"
            isAllowed={permissions?.find(
              (permission) => permission === "cities-update"
            )}
          >
            <NewCity />
          </PrivateRoutes>
        }
      /> */}

      {/* <Route path="/languages/create" element={
                <PrivateRoutes
                  redirectPath="/"
                  isAllowed={permissions?.find(permission => permission === 'languages-create')}
                >
                  <NewLanguage />
                </PrivateRoutes>
              }
            />
            <Route path="/languages/edit/:langId" element={
                <PrivateRoutes
                  redirectPath="/"
                  isAllowed={permissions?.find(permission => permission === 'languages-update')}
                >
                  <NewLanguage />
                </PrivateRoutes>
              }
            /> */}
    </Routes>
  );
};
export default AppRoutes;
