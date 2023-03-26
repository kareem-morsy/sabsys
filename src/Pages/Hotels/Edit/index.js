import "../Create/index.css";
import { BsPlusCircle } from "react-icons/bs";
import { BiMinusCircle } from "react-icons/bi";
import { useState, useRef, useEffect } from "react";
import { useAlert } from "react-alert";
import { useParams, useNavigate } from "react-router-dom";
import Select from "react-select";
import useToken from "../../../customHooks/useToken";
import fetcher from "../../../Services/fetcher";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import useSimplePost from "../../../customHooks/useSimplePost";
import useCheckListHandler from "../../../customHooks/useCheckListHandler";

const EditHotel = () => {
  const { hotelId } = useParams();
  const [hotel, setHotel] = useState();

  useEffect(() => {
    if (hotelId !== "undefined") {
      fetcher(`hotels/${hotelId}`).then((x) => setHotel(x.data.hotel_data));
    }
  }, [hotelId]);

  const { formPost } = useSimplePost();
  const {
    handleCheckList: handleMeals,
    checkList: Meals,
    setCheckList: SetMeals,
    handlePrice: handleMealPrice,
  } = useCheckListHandler();

  const {
    handleCheckList: handleExtras,
    checkList: Extras,
    setCheckList: SetExtras,
    handlePrice: handleExtraPrice,
  } = useCheckListHandler();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    // defaultValues: {
    //   hotel_persons: hotel?.hotel_persons,
    // },
  });

  const { fields, append, remove } = useFieldArray({
    name: "hotel_persons",
    control,
  });

  const [Countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [RoomTypes, setRoomTypes] = useState([]);
  const [RoomViews, setRoomViews] = useState([]);
  const [meals, setMeals] = useState([]);
  const [extras, setExtras] = useState([]);
  const [title, setTitle] = useState("Edit Hotel");
  const [rooms, setRooms] = useState([]);
  const [country, setCountry] = useState();
  const [city, setCity] = useState();

  useEffect(() => {
    setCountry(hotel?.city?.country);
    setCity(hotel?.city);
    setValue("email", hotel?.email);
    setValue("phone", hotel?.phone);
    setCountry(hotel?.city?.country);
    setCity(hotel?.city);
    setValue("country", hotel?.city?.country?.id);
    setValue("city_id", hotel?.city?.id);
    SetMeals(
      hotel?.meals?.map((meal) => ({
        id: meal.id,
        selling_price: meal.selling_price,
      }))
    );
    SetExtras(
      hotel?.extras?.map((extra) => ({
        id: extra.id,
        selling_price: extra.selling_price,
      }))
    );
    setValue("hotel_persons", hotel?.hotel_persons);
    setValue("isActive", hotel?.isActive === true ? 1 : 0);
    setValue("isVat", hotel?.isVat === true ? 1 : 0);
    setRooms(
      hotel?.rooms?.map((room) => ({
        room_type_id: room.room_type.id,
        room_view_id: room.room_view.id,
        stock: room.stock,
        isActive: room.isActive,
      }))
    );
  }, [hotel]);

  console.log("hotel", hotel);

  useEffect(() => {
    fetcher(`hotels/create`)
      .then((data) => {
        if (data !== undefined) {
          setCountries(data?.data?.countries);
          setRoomTypes(data?.data?.room_types);
          setRoomViews(data?.data?.room_views);
          setRooms(
            data?.data?.rooms?.map((room) => ({
              room_type_id: room.room_type.id,
              room_view_id: room.room_view.id,
              stock: room.stock,
              isActive: 1,
            }))
          );
          setMeals(data?.data?.meals);
          setExtras(data?.data?.extra_type);
        }
      })
      .catch((error) => {
        console.log(error?.message);
      });
    fetcher(`languages`)
      .then((data) => {
        if (data !== undefined) {
          setLanguages(data?.data);
        }
      })
      .catch((error) => {
        console.log(error?.message);
      });
  }, []);

  useEffect(() => {
    setCities(Countries.find((c) => c.id === country?.id)?.cities);
  }, [country]);

  const handleRoomsChange = (e, type_id, view_id) => {
    const count = rooms?.map((room) => {
      if (room.room_type_id === type_id && room.room_view_id === view_id) {
        room[e.target.name] = parseInt(e.target.value);
      }
      return room;
    });
    setRooms(count);
  };

  const onSubmit = (data) => {
    console.log("data", data);
    const newData = Object.values(data.languages);
    const obj = [];
    for (let i = 0; i < newData.length; i++) {
      obj.push({
        code: String(Object.keys(newData[i])),
        brand: String(Object.values(newData[i])),
      });
    }
    data.languages = obj;
    data.rooms = rooms;
    data.meals = Meals;
    data.extras = Extras;
    formPost(hotelId, "hotels", data);
  };

  console.log(rooms);

  return (
    <div className="container newHotel">
      <h1>{title}</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group row">
          {hotel?.translations?.map((lang, index) => (
            <>
              <label
                htmlFor={`brand${lang?.code}`}
                className="col-md-1 col-sm-12 col-form-label "
              >
                Brand ({lang?.code})
              </label>
              <div className="col-md-5 col-sm-12  ">
                <input
                  className="form-control col-md-6"
                  id={`brand${lang?.brand}`}
                  defaultValue={lang?.brand}
                  {...register(`languages.${index}.${lang?.code}`, {
                    required: "This Field is requird",
                    minLength: {
                      value: 3,
                      message: "Minimun length is 3.",
                    },
                  })}
                  placeholder={`Brand Name ${lang?.code}`}
                />
                {errors?.languages && errors.languages[`${index}`] && (
                  <span className="error ">This field is required</span>
                )}
              </div>
            </>
          ))}
        </div>

        <div className="form-group row my-3">
          <label
            htmlFor="country"
            className="col-md-1 col-sm-12 col-form-label"
          >
            Country
          </label>
          <div className="col-md-5 col-sm-12">
            <Controller
              control={control}
              name="country"
              {...register(`country`, {
                required: "Country is Required.",
              })}
              render={({ field: { onChange, value } }) => (
                <Select
                  placeholder="Select Country"
                  isMulti={false}
                  isClearable={true}
                  options={Countries?.map((type) => ({
                    value: type.id,
                    label: type.name,
                  }))}
                  classNamePrefix="Select"
                  value={{
                    value: country?.id,
                    label: country?.name,
                  }}
                  required
                  onChange={(e) => {
                    onChange(e.value);
                    setCountry({ id: e.value, name: e.label });
                  }}
                />
              )}
            />
            {errors.country && (
              <span className="error">Please select country</span>
            )}
          </div>
          <label htmlFor="city" className="col-md-1 col-sm-12 col-form-label">
            City
          </label>
          <div className="col-md-5 col-sm-6">
            <Controller
              control={control}
              name="city_id"
              {...register(`city_id`, {
                required: "City is Required.",
              })}
              render={({ field: { onChange, value } }) => (
                <Select
                  placeholder="Select City"
                  isMulti={false}
                  isClearable={true}
                  options={cities?.map((type) => ({
                    value: type.id,
                    label: type.name,
                  }))}
                  classNamePrefix="Select"
                  value={{
                    value: city?.id,
                    label: city?.name,
                  }}
                  onChange={(e) => {
                    onChange(e.value);
                    setCity({ id: e.value, name: e.label });
                  }}
                />
              )}
            />
            {errors.city_id && (
              <span className="error">Please select city</span>
            )}
          </div>
        </div>
        <div className="form-group row mb-5">
          <label htmlFor="email" className="col-md-1 col-sm-12 col-form-label">
            Email
          </label>
          <div className="col-md-5 col-sm-12">
            <input
              type="email"
              className="form-control"
              id="email"
              required
              placeholder="Email"
              {...register("email", {
                required: "Email is Required.",
                pattern: {
                  value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i,
                  message: "Please enter valid input.",
                },
              })}
            />
            {errors?.email && (
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
              type="number"
              className="form-control"
              id="phone"
              // required
              placeholder="Phone"
              {...register("phone", {
                required: "Phone is Required.",
              })}
            />
            {errors?.phone && (
              <span className="error">Phone Must Be A Valid Number</span>
            )}
          </div>
          <div className="col-md-3 mt-3">
            <label
              className="col-md-3 col-sm-12 col-form-label"
              htmlFor="active"
            >
              Active:
            </label>
            <input
              id="active"
              className="col-md-1"
              type="checkbox"
              {...register(`isActive`, {
                required: false,
              })}
            />
          </div>
          <div className="col-md-3 mt-3">
            <label className="col-md-3 col-sm-12 col-form-label" htmlFor="vat">
              Vat:
            </label>
            <input
              id="vat"
              className="col-md-1"
              type="checkbox"
              {...register(`isVat`, {
                required: false,
              })}
            />
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
                    {view.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {RoomTypes.map((type) => (
                <tr>
                  <th key={type.id} scope="row">
                    {type.title}
                  </th>
                  {RoomViews?.map((view) => (
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
                                room?.room_view_id === view?.id &&
                                room?.room_type_id === type?.id
                            )?.stock
                          }
                          onChange={(e) =>
                            handleRoomsChange(
                              e,
                              type.id,
                              view.id,
                              type.title,
                              view.title
                            )
                          }
                        />
                      </td>
                    </>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="section">
          <h5 className="head">Hotel Persons</h5>
          <BsPlusCircle
            className="add"
            onClick={() =>
              append({ name: "", title: "", email: "", phone: "" })
            }
          />
        </div>
        {fields?.map((field, index) => (
          <div div className="keyPersonSection" key={field.id}>
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
                  {...register(`hotel_persons.${index}.name`)}
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
                  {...register(`hotel_persons.${index}.title`)}
                />
              </div>
              <div className="col-md-1">
                <BiMinusCircle className="add" onClick={() => remove(index)} />
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
                  {...register(`hotel_persons.${index}.email`, {
                    // required: "Email is Required.",
                    pattern: {
                      value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i,
                      message: "Please enter valid input.",
                    },
                  })}
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
                  type="number"
                  className="form-control"
                  name="phone"
                  placeholder="Phone"
                  {...register(`hotel_persons.${index}.phone`)}
                />
              </div>
            </div>
          </div>
        ))}

        <div className="row my-5">
          <div className="row">
            <div className="mb-4">
              <h5 className="head mb-4">Meals</h5>
              <div className="d-flex flex-wrap">
                {meals?.map((meal) => {
                  console.log("meal", meal);
                  return (
                    <div className="col-md-4 my-2" key={meal.id}>
                      <div className="row">
                        <div className="col-md-9">
                          <input
                            className="meals"
                            type="checkbox"
                            id={meal.title}
                            value={meal.title}
                            checked={
                              Meals?.find((m) => m.id == meal.id) ? true : false
                            }
                            onChange={(e) =>
                              handleMeals(e, meal.id, {
                                id: meal.id,
                                // title: e.target.value,
                                selling_price: 0,
                              })
                            }
                          />
                          <label htmlFor={meal.title}>{meal?.title}</label>
                        </div>
                        <input
                          className="input col-md-3"
                          type="number"
                          min="0"
                          max="1000"
                          name="price"
                          id={meal.id}
                          value={
                            Meals?.find((m) => m.id === meal.id)?.selling_price
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

          {/* {meals.length < 1 && (
                <span className="mb-4 error">Please select at least one meal</span>
              )} */}
          <div className="row">
            <div className="mb-4">
              <h5 className="head mb-4">Extras</h5>
              {extras?.map((type) => (
                <div key={type.id}>
                  <h6 className="head px-3">{type.title} : </h6>
                  <div className="d-flex flex-wrap mb-3 px-3">
                    {type.extras?.map((ext) => (
                      <div className=" col-md-4 " key={ext.id}>
                        <input
                          className="meals"
                          type="checkbox"
                          id={ext.title}
                          value={ext.title}
                          checked={
                            Extras?.find((extra) => extra.id === ext.id)
                              ? true
                              : false
                          }
                          onChange={(e) =>
                            handleExtras(e, ext.id, {
                              id: ext.id,
                              // title: e.target.value,
                              selling_price: 0,
                            })
                          }
                        />
                        <label htmlFor={ext.title}>{ext.title}</label>
                        <input
                          className="input mx-2 "
                          type="number"
                          min="0"
                          max="1000"
                          name="price"
                          id={ext.id}
                          value={
                            Extras?.find((extra) => extra.id === ext.id)
                              ?.selling_price
                          }
                          onChange={(e) => handleExtraPrice(e, ext.id)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center my-5">
          <button className="btn bg-gold save w-50" type="submit">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditHotel;
