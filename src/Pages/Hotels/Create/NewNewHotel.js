import "./NewHotel.css";
import { BsPlusCircle } from "react-icons/bs";
import { BiMinusCircle } from "react-icons/bi";
import { useState, useRef, useEffect } from "react";
import { useAlert } from "react-alert";
import { v4 as uuidv4 } from "uuid";
import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import RequestContext from "../../Context/RequestContext";
import Select from "react-select";
import {
  getHotelById,
  editHotel,
  createHotel,
  getRoomMatrix,
} from "../../Services/Hotels";
import { getCityByCountry } from "../../Services/Cities";
import { regexEmail, regexPhone, regexTitle } from "../../Functions/regex";
import { getCountries } from "../../Services/Countries";
import { getLanguages } from "../../Services/Languages";
import { getMeals } from "../../Services/Meals";
import { getRoomTypes } from "../../Services/RoomTypes";
import { getRoomViews } from "../../Services/RoomViews";
import { getExtraTypes } from "../../Services/ExtraTypes";
import { getExtras } from "../../Services/Extras";
import fetcher from "../../Services/fetcher";

const NewHotel = () => {
  // const {
  //   Countries,
  //   Languages,
  //   Meals,
  //   RoomTypes,
  //   RoomViews,
  //   RoomMatrix,
  //   Refresh,
  //   ExtraTypes,
  //   Extras,
  // } = useContext(RequestContext);
  const [Countries, setCountries] = useState([]);
  const [Languages, setLanguages] = useState([]);
  const [meals, setMeals] = useState([]);
  const [RoomTypes, setRoomTypes] = useState([]);
  const [RoomViews, setRoomViews] = useState([]);
  const [RoomMatrix, setRoomMatrix] = useState([]);
  const [ExtraTypes, setExtraTypes] = useState([]);
  const [extras, setExtras] = useState([]);
  const [ERROR, setError] = useState();
  const [refreshState, setRefreshState] = useState(null);

  const Refresh = (state) => {
    setRefreshState(state);
  };
  const { token } = useToken();

  useEffect(() => {
    fetcher(`cities`)
      .then((data) => {
        if (data !== undefined) {
          setCountries(data.data);
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);
  useEffect(() => {
    fetcher(`languages`)
      .then((data) => {
        if (data !== undefined) {
          setLanguages(data.data);
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);
  useEffect(() => {
    fetcher(`meals`)
      .then((data) => {
        if (data !== undefined) {
          console.log("meals3333", data);
          setMeals(data?.data);
          console.log("meals3333444", meals);
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);
  useEffect(() => {
    fetcher(`room-types`)
      .then((data) => {
        if (data !== undefined) {
          setRoomTypes(data.data);
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);
  useEffect(() => {
    fetcher(`room-views`)
      .then((data) => {
        if (data !== undefined) {
          setRoomViews(data.data);
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);
  useEffect(() => {
    fetcher(`hotels/create`)
      .then((data) => {
        if (data !== undefined) {
          setRoomMatrix(data.data);
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);
  useEffect(() => {
    fetcher(`extra-types`)
      .then((data) => {
        if (data !== undefined) {
          setExtraTypes(data.data);
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);
  useEffect(() => {
    fetcher(`extras`)
      .then((data) => {
        if (data !== undefined) {
          console.log("extradata", data);
          setExtras(data.data);
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  const [brands, setBrands] = useState([]);
  const navigate = useNavigate();

  const [title, setTitle] = useState("Create Hotel");

  const [rooms, setRooms] = useState([]);
  const [keyPersons, setkeyPersons] = useState([
    {
      id: uuidv4(),
      name: "",
      title: "",
      phone: "",
      email: "",
    },
  ]);

  const [country, setCountry] = useState(null);
  const [city, setCity] = useState(null);
  const [cities, setCities] = useState([]);
  const emailRef = useRef("");
  const phoneRef = useRef("");

  let countryOptions = Countries?.map((c) => ({ value: c.id, label: c.name }));
  let cityOptions = cities?.map((c) => ({ value: c.id, label: c.city }));

  const [show, setShow] = useState(true);
  const alert = useAlert();

  const [brandError, setBrandError] = useState([]);
  const [emailError, setEmailError] = useState(null);
  const [phoneError, setPhoneError] = useState(null);
  const [countryError, setCountryError] = useState(null);
  const [cityError, setCityError] = useState(null);

  const [personNameError, setPersonNameError] = useState(null);
  const [personTitleError, setPersonTitleError] = useState(null);
  const [personEmailError, setPersonEmailError] = useState(null);
  const [personPhoneError, setPersonPhoneError] = useState(null);

  const handleCountry = (country) => {
    console.log(country);
    setCountry(country);
    setCountryError(false);
    getCityByCountry(country?.value).then((data) => {
      console.log(data);
      if (data !== undefined) {
        setCities(data.data);
      }
    });
  };
  const handleCity = (city) => {
    setCity(city);
    setCityError(false);
  };

  let hotelObj = {
    id: uuidv4(),
    languages: brands,
    city_id: city?.value,
    phone: phoneRef.current?.value,
    email: emailRef.current?.value,
    rooms: rooms,
    meals: meals?.map((meal) => ({
      id: meal.id,
      selling_price: meal.selling_price,
    })),
    extras: extras?.map((extra) => ({
      id: extra.id,
      selling_price: extra.selling_price,
    })),
    hotel_persons: keyPersons,
    isVat: 0,
    isActive: 1,
  };

  const { hotelId } = useParams();
  const [hotel, setHotel] = useState(hotelObj);

  const handleBrand = async (code, value) => {
    console.log("out", brands);
    const titles = brands.map((t) => {
      console.log("ttttt", t);
      console.log("in", brands);
      if (t.code == code) {
        t.brand = value;
      }
      return t;
    });
    setBrands(titles);

    const errors = brandError?.map((err) => {
      if (err.code === code) {
        if (/^[a-zA-Z,\u0621-\u064A\u0660-\u0669 ]+$/.test(value)) {
          err.error = false;
        } else {
          err.error = true;
        }
      }
      return err;
    });

    setBrandError(errors);
  };

  console.log(brands);

  const Append = () => {
    setkeyPersons([
      ...keyPersons,
      { id: uuidv4(), name: "", title: "", phone: "", email: "" },
    ]);
  };

  const handleMealChange = (event, id) => {
    let updatedList = [...meals];
    console.log("updatedList1", updatedList);
    if (event.target.checked) {
      updatedList = [
        ...meals,
        { id: id, name: event.target.value, selling_price: 0 },
      ];
    } else {
      updatedList.splice(
        meals.indexOf(meals?.find((meal) => meal.name === event.target.value)),
        1
      );
    }
    setMeals(updatedList);
    console.log("updatedList2", updatedList);
  };

  const handleExtraChange = (event, id, extraType) => {
    console.log(event.target.checked, id);
    let updatedList = [...extras];
    if (event.target.checked) {
      updatedList = [
        ...extras,
        {
          id: id,
          type: extraType,
          extra: event.target.value,
          selling_price: 0,
        },
      ];
    } else {
      updatedList.splice(
        extras.indexOf(
          extras.find((extra) => extra.extra === event.target.value)
        ),
        1
      );
    }

    setExtras(updatedList);
  };
  console.log("extras", extras);

  const handleExtraPrice = (e, id) => {
    let newExtra = extras.map((extra) => {
      if (extra.id === id) {
        extra.selling_price = parseInt(e.target.value);
      }
      return extra;
    });
    setExtras(newExtra);
  };

  const handleMealPrice = (e, id) => {
    let newMeal = meals.map((meal) => {
      if (meal.id === id) {
        meal.selling_price = parseInt(e.target.value);
      }
      return meal;
    });
    setMeals(newMeal);
  };

  const handleRoomsChange = (e, type_id, view_id) => {
    const count = rooms.map((room) => {
      if (room.room_type_id === type_id && room.room_view_id === view_id) {
        room[e.target.name] = parseInt(e.target.value);
      }
      return room;
    });
    setRooms(count);
  };

  const handleKeyPersons = (e, id) => {
    const newPerson = keyPersons.map((person) => {
      if (person.id === id) {
        person[e.target.name] = e.target.value;
      }
      return person;
    });
    setkeyPersons(newPerson);

    if (e.target.name === "name") {
      if (regexTitle(e.target?.value)) {
        setPersonNameError(false);
      } else {
        setPersonNameError(true);
      }
    }
    if (e.target.name === "title") {
      if (regexTitle(e.target?.value)) {
        setPersonTitleError(false);
      } else {
        setPersonTitleError(true);
      }
    }
    if (e.target.name === "email") {
      if (regexEmail(e.target?.value)) {
        setPersonEmailError(false);
      } else {
        setPersonEmailError(true);
      }
    }
    if (e.target.name === "phone") {
      if (regexPhone(e.target?.value)) {
        setPersonPhoneError(false);
      } else {
        setPersonPhoneError(true);
      }
    }
  };

  const handleRemovePerson = (e, id) => {
    e.preventDefault();
    const persons = [...keyPersons];
    persons.splice(
      persons.findIndex((person) => person.id === id),
      1
    );
    setkeyPersons(persons);
  };

  const Reset = () => {
    // phoneRef.current.value = "";
    // emailRef.current.value = "";
    // keyPersons = [];
    // rooms = RoomMatrix;
    // setMeals(
    //   meals.map((m) => ({ id: m.id, title: m.title, selling_price: 0 }))
    // );
    // setBrands(
    //   Languages?.filter((lang) => lang.isActive === true)?.map((l) => ({
    //     code: l?.code,
    //     brand: "",
    //   }))
    // );
    // setExtras(
    //   extras.map((e) => ({
    //     id: e.id,
    //     title: e.title,
    //     type: e.type,
    //     selling_price: 0,
    //   }))
    // );
    // setShow(true);
  };

  const newHotel = (e) => {
    console.log("hotelObj", hotelObj);
    e.preventDefault();

    if (!show) {
      if (hotelId) {
        editHotel(hotelId, hotelObj)
          .then((res) => {
            alert.success("Item Updated Successfully");
            Refresh("hotels");
            navigate("/hotels");
          })
          .catch((error) => {
            console.log(error);
            setShow(true);
            error?.response?.data?.message?.map((err) => alert.error(err));
          });
      } else {
        createHotel(hotelObj)
          .then((res) => {
            console.log(res);
            alert.success("Item Added Successfully");
            Reset();
            setShow(true);
            Refresh("hotels");
          })
          .catch((error) => {
            setShow(true);
            error?.response?.data?.message?.map((err) => alert.error(err));
          });
      }
    } else {
      alert.error("please enter all data");
    }
  };

  useEffect(() => {
    if (
      emailError === false &&
      phoneError === false &&
      personNameError !== true &&
      personTitleError !== true &&
      personPhoneError !== true &&
      personEmailError !== true &&
      meals.length > 1 &&
      extras.length > 1 &&
      city &&
      country &&
      (!brandError?.find((err) => err.error === true) ||
        !brandError?.find((err) => err.error === ""))
    ) {
      setShow(false);
    } else {
      setShow(true);
    }
  }, [
    brandError,
    emailError,
    phoneError,
    personEmailError,
    personPhoneError,
    personNameError,
    personTitleError,
    meals,
    extras,
    city,
    country,
  ]);

  useEffect(async () => {
    setBrands(
      Languages?.filter((lang) => lang.isActive === true)?.map((lang) => ({
        code: lang?.code,
        brand: "",
      }))
    );

    if (hotelId) {
      getHotelById(hotelId).then((data) => {
        if (data !== undefined) {
          setHotel(data.data);
          setRooms(
            data.data.rooms?.map((room) => ({
              room_type_id: room.room_type.id,
              room_view_id: room.room_view.id,
              isActive: 1,
              stock: room.stock,
            }))
          );
          setkeyPersons(data.data.hotel_persons);
          setExtras(data.data.extras);
          setMeals(
            data.data.meals?.map((m) => ({
              id: m.id,
              name: m.title,
              selling_price: m.selling_price,
            }))
          );
          setTitle("Edit Hotel");
          setCountry({
            value: data.data.city.country?.id,
            label: data.data.city.country?.name,
          });
          setCity({ value: data.data.city.id, label: data.data.city.name });
          setBrandError(
            Languages?.filter((lang) => lang.isActive === true)?.map(
              (lang) => ({ code: lang?.code, error: false })
            )
          );
          setCountryError(false);
          setCityError(false);
          setEmailError(false);
          setPhoneError(false);
          setPersonPhoneError(false);
          setPersonEmailError(false);
          setPersonNameError(false);
          setPersonTitleError(false);
        }
      });
    } else {
      setRooms(
        RoomMatrix?.map((room) => ({
          room_type_id: room?.room_type?.id,
          room_view_id: room?.room_view?.id,
          isActive: 1,
          stock: room?.stock,
        }))
      );
      setMeals(
        meals.map((m) => ({ id: m.id, name: m.name, selling_price: 0 }))
      );
      setBrands(
        Languages?.filter((lang) => lang.isActive === true)?.map((l) => ({
          code: l?.code,
          brand: "",
        }))
      );
      setExtras(
        extras.map((e) => ({
          id: e.id,
          title: e.extra,
          type: e.type,
          selling_price: 0,
        }))
      );
      setBrandError(
        Languages?.filter((lang) => lang.isActive === true)?.map((l) => ({
          code: l?.code,
          error: "",
        }))
      );
    }
  }, [hotelId, Languages, RoomMatrix]);

  useEffect(() => {
    hotel?.translations?.map((trans) => handleBrand(trans.code, trans.brand));
  }, [hotel]);

  return (
    <div className="container newHotel">
      <h1>{title}</h1>
      <form onSubmit={(e) => newHotel(e)}>
        <div className="form-group row">
          {brands?.map((lang) => {
            console.log("langggg", lang);
            return (
              <>
                <label
                  htmlFor={`brand${lang?.code}`}
                  className="col-md-1 col-sm-12 col-form-label my-2"
                >
                  Brand ({lang?.code})
                </label>
                <div className="col-md-5 col-sm-12 my-2">
                  <input
                    type="text"
                    required
                    className="form-control"
                    id={`brand${lang?.code}`}
                    name={`brand-${lang?.code}`}
                    placeholder={`Brand Name ${lang?.code}`}
                    value={lang?.brand}
                    defaultValue={lang?.brand}
                    onChange={(e) => handleBrand(lang?.code, e.target?.value)}
                  />
                </div>
              </>
            );
          })}
        </div>
        {brandError?.find((err) => err.error == true) && (
          <span className="error">
            Please enter valid Brand No Special Charachters / No Numbers
          </span>
        )}

        <div className="form-group row my-3">
          <label
            htmlFor="country"
            className="col-md-1 col-sm-12 col-form-label"
          >
            Country
          </label>
          <div className="col-md-5 col-sm-12">
            <Select
              value={country}
              isMulti={false}
              isClearable={false}
              options={countryOptions}
              classNamePrefix="Select"
              onChange={(e) => handleCountry(e)}
            />
            {countryError && (
              <span className="error">Please select country</span>
            )}
          </div>
          <label htmlFor="city" className="col-md-1 col-sm-12 col-form-label">
            City
          </label>
          <div className="col-md-5 col-sm-6">
            <Select
              value={city}
              isMulti={false}
              isClearable={false}
              options={cityOptions}
              classNamePrefix="Select"
              onChange={(e) => handleCity(e)}
            />
            {cityError && <span className="error">Please select city</span>}
          </div>
        </div>
        <div className="form-group row mb-5">
          <label htmlFor="email" className="col-md-1 col-sm-12 col-form-label">
            Email
          </label>
          <div className="col-md-5 col-sm-12">
            <input
              ref={emailRef}
              type="email"
              className="form-control"
              id="email"
              required
              placeholder="Email"
              defaultValue={hotel?.email}
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
          <label htmlFor="phone" className="col-md-1 col-sm-12 col-form-label">
            Phone
          </label>
          <div className="col-md-5 col-sm-6">
            <input
              ref={phoneRef}
              type="text"
              className="form-control"
              id="phone"
              required
              placeholder="Phone"
              defaultValue={hotel?.phone}
              onChange={(e) =>
                /^01[0-2,5]{1}[0-9]{8}$/.test(e.target.value)
                  ? setPhoneError(false)
                  : setPhoneError(true)
              }
            />
            {phoneError && (
              <span className="error">Phone Must Be A Valid Number</span>
            )}
          </div>
        </div>
        <hr />

        <div>
          <h5 className="head">Rooms</h5>
          <table className="table mb-5 mt-4">
            <thead>
              <tr>
                <th scope="col">Types / Views</th>
                {RoomViews.map((view) => (
                  <th key={view.id} scope="col">
                    {view.view}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {RoomTypes.map((type) => (
                <tr>
                  <th key={type.id} scope="row">
                    {type.type}
                  </th>
                  {RoomViews.map((view) => {
                    return (
                      <>
                        <td key={view.id}>
                          <input
                            className="input mx-2"
                            type="number"
                            min="0"
                            max="1000"
                            id={[type.id, view.id]}
                            name="stock"
                            defaultValue={
                              rooms?.find(
                                (room) =>
                                  room.room_view_id === view?.id &&
                                  room.room_type_id === type?.id
                              )?.stock
                            }
                            onChange={(e) =>
                              handleRoomsChange(
                                e,
                                type.id,
                                view.id,
                                type.type,
                                view.view
                              )
                            }
                          />
                        </td>
                      </>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="section">
          <h5 className="head">Hotel Persons</h5>
          <BsPlusCircle className="add" onClick={Append} />
        </div>
        {keyPersons?.map((person) => (
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
                  onBlur={(e) => handleKeyPersons(e, person.id)}
                  defaultValue={person.name}
                />
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
                  onBlur={(e) => handleKeyPersons(e, person.id)}
                  defaultValue={person.title}
                />
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
                  onBlur={(e) => handleKeyPersons(e, person.id)}
                  defaultValue={person.email}
                />
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
                  onBlur={(e) => handleKeyPersons(e, person.id)}
                  defaultValue={person.phone}
                />
              </div>
            </div>
          </div>
        ))}

        {personNameError && (
          <span className="error">
            Please enter valid Name No Special Charachters / No Numbers
          </span>
        )}
        {personTitleError && (
          <span className="error">
            Please enter valid Title No Special Charachters / No Numbers
          </span>
        )}
        {personEmailError && (
          <span className="error">Email Must be valid Ex: test@test.com</span>
        )}
        {personPhoneError && (
          <span className="error">Phone Must Be A Valid Number</span>
        )}

        <div className="row my-5">
          <div className="row">
            <div className="mb-4">
              <h5 className="head mb-4">Meals</h5>
              <div className="d-flex flex-wrap">
                {meals?.map((meal) => {
                  console.log("mealzzzss", meals);
                  console.log("mealzzz", meal);
                  return (
                    <div className="col-md-4 my-2" key={meal.id}>
                      <div className="row">
                        <div className="col-md-9">
                          <input
                            className="meals"
                            type="checkbox"
                            id={meal.name}
                            value={meal.name}
                            checked={
                              meals?.find((m) => m.id === meal.id)
                                ? true
                                : false
                            }
                            onChange={(e) => handleMealChange(e, meal.id)}
                          />
                          <label htmlFor={meal.name}>{meal?.name}</label>
                        </div>
                        <input
                          className="input col-md-3"
                          type="number"
                          min="0"
                          max="1000"
                          name="price"
                          id={meal.id}
                          value={
                            meals?.find((m) => m.id === meal.id)?.selling_price
                          }
                          onChange={(e) => handleMealPrice(e, meal.id)}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {meals.length < 1 && (
            <span className="mb-4 error">Please select at least one meal</span>
          )}

          <div className="row">
            <div className="mb-4">
              <h5 className="head mb-4">Extras</h5>
              {ExtraTypes.map((type) => {
                console.log("typetypetype4545", type);
                return (
                  <div key={type.id}>
                    <h6 className="head px-3">{type.title} : </h6>
                    <div className="d-flex flex-wrap mb-3 px-3">
                      {type.extras?.map((ext) => {
                        console.log("extextext", ext);
                        return (
                          <div className=" col-md-4 " key={ext.id}>
                            <input
                              className="meals"
                              type="checkbox"
                              id={ext.id}
                              value={ext.extra}
                              checked={
                                extras?.find((extra) => extra.id === ext.id)
                                  ? true
                                  : false
                              }
                              onChange={(e) =>
                                handleExtraChange(e, ext.id, type.type)
                              }
                            />
                            <label htmlFor={ext.extra}>{ext.extra}</label>
                            <input
                              className="input mx-2 "
                              type="number"
                              min="0"
                              max="1000"
                              name="price"
                              id={ext.id}
                              // defaultValue={
                              //   extras?.find((extra) => extra.title === ext.title)
                              //     ?.selling_price
                              // }
                              value={
                                extras?.find((extra) => extra.id === ext.id)
                                  ?.selling_price
                              }
                              onChange={(e) => handleExtraPrice(e, ext.id)}
                            />
                            {/* {console.log(ext)} */}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {extras.length < 1 && (
          <span className="mb-4 error">Please select at least one extra</span>
        )}

        <div className="d-flex justify-content-center my-5">
          <button className="btn bg-gold w-100" type="submit" disabled={show}>
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewHotel;
