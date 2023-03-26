import { RiDashboardFill } from "react-icons/ri";
import { BsCalendar3 } from "react-icons/bs";
import { FaHotel, FaUsers } from "react-icons/fa";
import { HiLocationMarker } from "react-icons/hi";
import { MdLanguage, MdOutlineBed, MdOutlineAttachMoney } from "react-icons/md";
import { ImUserTie } from "react-icons/im";
import { AiOutlineAppstoreAdd } from "react-icons/ai";

export const navbar = {
  navs: [
    {
      id: 1,
      hasChild: true,
      text: "Dashboard",
      icon: <BsCalendar3 size="20px" />,
      children: [
        { text: "General Dashboard", url: "/" },
        { text: "Accountant Dashboard", url: "/" },
        // { text: "Meals", url: "/meals" },
      ],
    },
    // {
    //   id: 1,
    //   hasChild: false,
    //   text: "General Dashboard",
    //   url: "/",
    //   icon: <RiDashboardFill size="20px" />,
    // },
    // {
    //   id: 1,
    //   hasChild: false,
    //   text: "Accountant Dashboard",
    //   url: "/",
    //   icon: <RiDashboardFill size="20px" />,
    // },
    {
      id: 2,
      hasChild: true,
      text: "Reservations",
      icon: <BsCalendar3 size="20px" />,
      children: [
        { text: "Create Reservation", url: "/reservations/create" },
        { text: "All Reservations", url: "/reservations" },
        { text: "Availability", url: "" },
        // { text: "Meals", url: "/meals" },
      ],
    },
    // {
    //   id: 2,
    //   hasChild: false,
    //   text: "Reservations",
    //   url: "/reservations",
    //   icon: <BsCalendar3 size="20px" />,
    // },
    {
      id: 3,
      hasChild: true,
      text: "Hotels",
      icon: <FaHotel size="20px" />,
      children: [
        { text: "Create Hotel", url: "/hotels/create" },
        { text: "All Hotels", url: "/hotels" },
        { text: "All Rooms", url: "/rooms" },
        // { text: "Meals", url: "/meals" },
      ],
    },
    // {
    //   id: 4,
    //   hasChild: true,
    //   text: "Rooms",
    //   icon: <MdOutlineBed size="22px" />,
    //   children: [
    //     { text: "All Rooms", url: "/rooms" },
    //     // { text: "Room Types", url: "/room-types" },
    //     // { text: "Room Views", url: "/room-views" },
    //   ],
    // },
    // {
    //   id: 5,
    //   hasChild: true,
    //   text: "Extras",
    //   icon: <AiOutlineAppstoreAdd size="22px" />,
    //   children: [
    //     { text: "Extra Types", url: "/extra-types" },
    //     { text: "Extras", url: "/extras" },
    //   ],
    // },
    {
      id: 6,
      hasChild: true,
      text: "Clients",
      icon: <ImUserTie size="20px" />,
      children: [
        { text: "Create Client", url: "/clients/create" },
        { text: "All Clients", url: "/clients" },
        { text: "Create Client Type", url: "/clients/client-types/create" },
        { text: "All Client Types", url: "/clients/client-types" },
      ],
    },
    {
      id: 7,
      hasChild: true,
      text: "Users",
      icon: <FaUsers size="20px" />,
      children: [
        { text: "Create User", url: "/users/create" },
        { text: "All Users", url: "/users" },
        { text: "All Roles", url: "/roles" },
      ],
    },
    {
      id: 8,
      hasChild: false,
      text: "Create Collection",
      url: "/collections/create",
      icon: <MdLanguage size="20px" />,
    },
    {
      id: 9,
      hasChild: true,
      text: "Reports",
      icon: <MdOutlineAttachMoney size="25px" />,
      children: [
        { text: "Download Center", url: "/reports/downloadcenter" },
      ],
    },
    {
      id: 10,
      hasChild: false,
      text: "Banks",
      url: "/banks",
      icon: <MdOutlineAttachMoney size="25px" />,
      children: [
        { text: "Create Bank", url: "/banks/create" },
        { text: "All Banks", url: "/banks" },
      ],
    },
    // {
    //   id: 9,
    //   hasChild: true,
    //   text: "Locations",
    //   icon: <HiLocationMarker size="20px" />,
    //   children: [
    //     { text: "Countries", url: "/countries" },
    //     { text: "Cities", url: "/cities" },
    //   ],
    // },

    {
      id: 11,
      hasChild: false,
      text: "Languages",
      url: "/languages",
      icon: <MdLanguage size="20px" />,
    },
  ],
};

export default navbar;
