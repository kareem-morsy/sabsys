import React, { useEffect, useState, useRef } from "react";
// import RequestContext from "../../Context/RequestContext";
import "./Navbar.css";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { MenuItem } from "react-pro-sidebar";
import { FaRegWindowClose, FaBars, FaUserAlt, FaHeart } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { BsFillBellFill } from "react-icons/bs";
// import { getHotelsList } from "../../Services/Hotels";
import fetcher from "../../Services/fetcher";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Select, { components } from "react-select";
// import {
//   faBed,
//   faCalendarDays,
//   faPerson,
// } from "@fortawesome/free-solid-svg-icons";
import { AiOutlineSearch } from "react-icons/ai";
import { useHistory } from "react-router-dom";

const CaretDownIcon = () => {
  return <AiOutlineSearch />;
};

const DropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <CaretDownIcon />
    </components.DropdownIndicator>
  );
};
const Nav = ({ show, handleShow, user, handleLogout ,
  // messageHistory
}) => {
  const [HotelsList, setHotelsList] = useState([]);
  const [ERROR, setError] = useState();
  const [refreshState, setRefreshState] = useState(null);
  const Refresh = (state) => {
    setRefreshState(state);
  };
  const location = useLocation();
  useEffect(() => {
    fetcher(`hotels/list?limit=1000`)
      .then((data) => {
        if (data !== undefined) {
          setHotelsList(data.data);
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);
  const searchRef = useRef();

  // const {Hotels} = useContext(RequestContext);
  const [hotel, setHotel] = useState();
  const navigate = useNavigate();
  const [foundHotels, setFoundHotels] = useState(HotelsList);

  const [isOpen, setOpen] = useState(false);
  const [notifi, setNotifi] = useState(false);
  const openDropdown = () => {
    setOpen(!isOpen);
    setNotifi(false);
  };

  const openNotification = () => {
    setNotifi(!notifi);
    setOpen(false);
  };

  useEffect(() => {
    window.onclick = function () {
      if (isOpen === true) {
        setOpen(false);
      }

      if (notifi === true) {
        setNotifi(false);
      }
    };
  }, [isOpen, notifi]);

  const search = (e) => {
    // setHotel(Hotels?.find(hotel => (hotel.brand).toLowerCase().includes((searchRef.current?.value).toLowerCase())))

    const keyword = e.target.value;

    if (keyword !== "") {
      const results = HotelsList.filter((hotel) => {
        return hotel.brand.toLowerCase().startsWith(keyword.toLowerCase());
        // Use the toLowerCase() method to make it case-insensitive
      });
      setFoundHotels(results);
    } else {
      setFoundHotels(HotelsList);
      // If the text field is empty, show all users
    }

    setHotel(keyword);
  };

  // useEffect(() => {
  //   if(hotel?.id) navigate(`/hotels/${hotel.id}`)
  // },[hotel])
  const [selectedOption, setSelectedOption] = useState("Search by Hotel Name");
  const handleSelect = (e) => {
    setSelectedOption(e);
  };
  const selectInputRef = useRef();
  const onClear = () => {
    selectInputRef.current.select.clearValue();
  };
  useEffect(
    () => !location.pathname.includes("/hotels") && onClear(),
    [location.pathname]
  );
  return (
    <>
      <nav className="nav-center p-2">
        <div className="container-fluid">
          <div className="navbar">
            <MenuItem
              icon={<FaBars />}
              className={`toggle-sidebar ${show ? "open" : ""}`}
              onClick={handleShow}
            ></MenuItem>

            <form className="d-flex search ">
              <Select
                ref={selectInputRef}
                value={selectedOption}
                defaultValue=" Search by Hotel Name"
                components={{ DropdownIndicator }}
                className="w-75"
                isClearable={true}
                options={HotelsList?.map((hotel) => ({
                  value: hotel?.id,
                  label: (
                    <div
                      onClick={() => navigate(`/hotels/${hotel.id}`)}
                      key={hotel.id}
                      style={{
                        color: "gray",
                        "--hover-color": "gray !important",
                      }}
                    >
                      {hotel.brand}
                    </div>
                  ),
                }))}
                onChange={handleSelect}
                styles={{
                  placeholder: (base, state) => ({
                    ...base,
                    fontSize: 13,
                  }),
                  option: (base, state) => ({
                    ...base,
                    // color: "#eee",
                    // "&:hover": { color: "red" },
                    // "&:focus": { borderColor: "#c99822" },
                    backgroundColor: state.isSelected ? "#f3d182" : "white",
                    color: state.isSelected ? "white" : "gray",

                    cursor: "pointer",
                    width: "100%",
                  }),
                  control: (base, state) => ({
                    ...base,
                    // "&:hover": { borderColor: "#c99822" },
                    // "&:focus": { borderColor: "#c99822" },
                    borderColor: state.isSelected ? "#c99822" : "lightGray",

                    width: "100%",
                  }),
                }}
                placeholder="Search by Hotel Name"
              />
              {/* <input
                className="form-control mr-sm-2"
                type="search"
                ref={searchRef}
                placeholder="Search by Hotel Name"
                aria-label="Search"
                onChange={(e) => search(e)}
              /> */}
              {/* <button className="btn btn-outline-gold mx-2 my-2 my-sm-0" type="button" >Search</button> */}

              {/* 
            <div
              className={`${
                hotel ? "content filter active" : "content filter"
              } `}
            >
              {foundHotels && foundHotels.length > 0 ? (
                foundHotels.map((hotel) => (
                  <Link to={`/hotels/${hotel.id}`} key={hotel.id}>
                    {hotel.brand}
                  </Link>
                ))
              ) : (
                <h1>No results found!</h1>
              )}
            </div> */}
            </form>

            <div className="d-flex mx-3 justify-content-between">
              <span
                className="my-auto mx-5 position-relative notifyIcon"
                onClick={openNotification}
              >
                <span
                  className="notifyCount">0</span>
                
                <BsFillBellFill onClick={openNotification} />
              </span>
              <div
                className={`${
                  notifi
                    ? "content notificationContent active"
                    : "content notificationContent"
                } `}
              >
                <Link to="/">Notifi 1</Link>
                <Link to="/">Notifi 2</Link>
                <Link to="/">Notifi 3</Link>
                <hr />
                <Link to="/downloadstatus" className="see_all">
                  See all notification
                </Link>
              </div>

              {/* <img src={user.image} alt="profileIcon" className="profileIcon my-auto"/> */}
              <div className="d-flex">
                <FaUserAlt
                  color="#C99822"
                  fontSize="20px"
                  className="my-auto"
                />
                <div className="dropdown">
                  <button className="dropbtn link" onClick={openDropdown}>
                    {user?.name}
                    <IoMdArrowDropdown color="#c99822" size="25px" />
                  </button>
                  <div
                    className={`${
                      isOpen
                        ? "dropdown-content content active"
                        : "content dropdown-content"
                    } `}
                  >
                    <Link to={`users/${user?.id}`}>Profile</Link>
                    <Link to={`settings/${user?.id}`}>Settings</Link>
                    <Link to="login" onClick={handleLogout}>
                      Logout
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
    // <nav className="navbar navbar-expand-lg navbar-light bg-light">
    // <a className="navbar-brand" href="#">
    //   Navbar
    // </a>
    // <button
    //   className="navbar-toggler"
    //   type="button"
    //   data-toggle="collapse"
    //   data-target="#navbarNavDropdown"
    //   aria-controls="navbarNavDropdown"
    //   aria-expanded="false"
    //   aria-label="Toggle navigation"
    // >
    //   <span className="navbar-toggler-icon"></span>
    // </button>

    // <div className="collapse navbar-collapse" id="navbarNavDropdown">
    //   <ul className="navbar-nav">
    //     <li className="nav-item active">
    //       <a className="nav-link" href="#">
    //         Home <span className="sr-only">(current)</span>
    //       </a>
    //     </li>
    //     <li className="nav-item">
    //       <a className="nav-link" href="#">
    //         Features
    //       </a>
    //     </li>
    //     <li className="nav-item">
    //       <a className="nav-link" href="#">
    //         Pricing
    //       </a>
    //     </li>
    //     <li className="nav-item dropdown">
    //       <a
    //         className="nav-link dropdown-toggle"
    //         href="#"
    //         id="navbarDropdownMenuLink"
    //         data-toggle="dropdown"
    //         aria-haspopup="true"
    //         aria-expanded="false"
    //       >
    //         Dropdown link
    //       </a>
    //       <div
    //         className="dropdown-menu"
    //         aria-labelledby="navbarDropdownMenuLink"
    //       >
    //         <a className="dropdown-item" href="#">
    //           Action
    //         </a>
    //         <a className="dropdown-item" href="#">
    //           Another action
    //         </a>
    //         <a className="dropdown-item" href="#">
    //           Something else here
    //         </a>
    //       </div>
    //     </li>
    //   </ul>
    // </div>
    // </nav>
    // <nav>
    //     <div className="nav-center">
    //         <div className="nav-header">
    //             <img className="logo" src={logo} alt="logo"/>
    //             <button className="nav-toggle">
    //                 <FaBars/>
    //             </button>
    //         </div>
    //         <div className='links-container'>
    //             <ul className='links'>
    //                 {navbar.navs.map((nav) =>(
    //                     <li>
    //                     <a href={nav.url}>{nav.text}</a>
    //                     </li>
    //                 ))}
    //             </ul>
    //         </div>
    //         <ul className='social-icons'>
    //             {navbar.links.map((link) => (
    //                 <li>
    //                     <a href={link.text}>{link.text}</a>
    //                 </li>
    //                 ))}
    //         </ul>
    //     </div>
    // </nav>
  );
};

export default Nav;
