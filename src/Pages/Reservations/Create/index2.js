import { useEffect, useState } from "react";
import { Controller, useForm, useFieldArray } from "react-hook-form";
import Select from "react-select";
// import { userService } from "../../Services";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import { number } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
/*Icons*/
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiOutlinePlusCircle } from "react-icons/ai";
import DatePicker from "react-multi-date-picker";
import transition from "react-element-popper/animations/transition"
import arabic from "react-date-object/calendars/arabic";
import arabic_ar from "react-date-object/locales/arabic_ar";
import arabic_en from "react-date-object/locales/arabic_en";
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_en from "react-date-object/locales/gregorian_en";
import { DateObject, getAllDatesInRange } from "react-multi-date-picker";
import "react-multi-date-picker/styles/layouts/mobile.css";
import moment from "moment-hijri";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import fetcher from "../../../Services/fetcher";
import InputIcon from "react-multi-date-picker/components/input_icon";
import "./index.css"
import { BsFilePerson } from "react-icons/bs";
import { useLocation } from 'react-router-dom'
/*Icons*/
function CreateReservation() {

    //Start Fetch Data
    const [hotelsList, setHotelsList] = useState();
    const [clients, setClients] = useState();
    const [paymentMethods, setPaymentMethods] = useState();
    const [roomTypes, setRoomTypes] = useState();
    const [roomViews, setRoomViews] = useState();
    const [meals, setMeals] = useState();
    const [reservationStatus, setReservationStatus] = useState();

    useEffect(() => {
        fetcher("hotels/list").then((x) => setHotelsList(x));
        fetcher("clients").then((x) => setClients(x));
        fetcher("payment-method").then((x) => setPaymentMethods(x));
        fetcher("room-types").then((x) => setRoomTypes(x));
        fetcher("room-views").then((x) => setRoomViews(x));
        fetcher("meals").then((x) => setMeals(x));
        fetcher("reservation-status").then((x) => setReservationStatus(x));
    }, [hotelsList?.message, clients?.message, paymentMethods?.message]);
    //End Fetch Data 

    // Define UseForm 
    const {
        register,
        control,
        handleSubmit,
        reset,
        formState,
        watch,
        getValues,
        setValue,
    } = useForm();

    //Start Get URL query Start Date End Date 
    const alert = useAlert();
    const navigate = useNavigate();
    const search = useLocation().search
    const searchParams = new URLSearchParams(search)
    console.log("searchParams.get('startDate')", searchParams.get('startDate'))
    console.log("new DateObject(searchParams.get('startDate'))", new DateObject(searchParams.get('startDate')))
    console.log("searchParams.get('endDate')", searchParams.get('endDate'))
    console.log("new DateObject(searchParams.get('endDate'))", new DateObject(searchParams.get('endDate')))
    //End Get URL query Start Date End Date 

    /*Rpeater plus minus*/
    const [counter, setCounter] = useState(1);
    const [submittedDate, setSubmittedDate] = useState(1);
    const [values, setValues] = useState([
        new DateObject().subtract(0, "days"),
        new DateObject().add(4, "days"),
    ]);
    const [getGregorianDate, setGetGregorianDate] = useState([
        new DateObject().subtract(0, "days"),
        new DateObject().add(5, "days"),
    ]);
    const [getHijiriDate, setGetHijiriDate] = useState([
        new DateObject().add(1, "days"),
        new DateObject().add(5, "days"),
    ]);
    const [optionalDate, setOptionalDate] = useState(new DateObject());
    const [optionalDateMinDate, setOptionalDateMinDate] = useState(new DateObject());
    const [calenderDates, setCalenderDates] = useState();
    const [allDates, setAllDates] = useState([]);
    useEffect(() => {
        if (searchParams.get('startDate')) {
            const calendarGregorianDates = [
                new DateObject(searchParams.get('startDate')),
                new DateObject(searchParams.get('endDate')),
            ]
            const calendarHijriDates = [
                new DateObject(searchParams.get('startDateHijri')),
                new DateObject(searchParams.get('endDateHijri'))
            ];
            setGetGregorianDate(calendarGregorianDates)
            convertDate(calendarGregorianDates, `gregorian`)
            setCalenderDates(calendarGregorianDates)
            const AllDatesRanges = getAllDatesInRange(calendarGregorianDates)
            setAllDates(AllDatesRanges)
            console.log("AllDatesRanges", AllDatesRanges.map(d => d.format()))
        } else {
            const AllDatesRanges = getAllDatesInRange(getGregorianDate)
            setAllDates(AllDatesRanges)
        }

    }, [])

    // useEffect(() => {
    //     const AllDatesRanges = getAllDatesInRange(getGregorianDate)
    //     console.log("pppp", AllDatesRanges)

    //     const UseWatch = watch()?.slots;
    //     console.log("UseWatch1", UseWatch)

    //     setValue('slots', AllDatesRanges?.map(date => {
    //         UseWatch?.map((slot) => {
    //             slot?.nights?.map(i => {
    //                 i.date = date
    //             })
    //         })

    //     }))
    //     console.log("UseWatch2", UseWatch)



    // }, [])

    const [toDate, setToDate] = useState();
    const [fromHijiriDate, setFromHijiriDate] = useState();
    const [toHijiriDate, setToHijiriDate] = useState();
    /*Rpeater plus minus*/
    // form validation rules
    const validationSchema = Yup.object().shape({
        dsfsd: Yup.array().of(
            Yup.object().shape({
                // room_type_id: Yup.mixed().required().label("Selected Room Type"),
                // room_view_id: Yup.mixed().required().label("Selected Room Type"),
                meal_id: Yup.mixed().required().label("Selected Room Type"),
                count: Yup.string().required("No.Rooms is required"),
            })
        ),
    });

    const formOptions = { resolver: yupResolver(validationSchema) };



    /*Start Actions*/
    /*Start Actions State */
    const [showDetails, setShowDetails] = useState(false);
    /*End Actions State */
    const handleDetails = () => setShowDetails((prev) => !prev);
    /*End Actions*/
    // functions to build form returned by useForm() and useFieldArray() hooks


    useEffect(() => {
        setValue('from_date', getGregorianDate);
        setValue('from_hijri_date', getHijiriDate);
        setValue('optional_date', optionalDate);
    }, [getGregorianDate, getHijiriDate]);
    // useForm(formOptions);
    const { errors } = formState;
    const { fields, append, remove } = useFieldArray({
        name: "slots",
        control,
    });

    // watch to enable re-render when ticket number is changed
    const plus = watch("plus");
    const minus = watch("minus");
    const Total = watch("slots[0].total", false);
    // console.log("watch", watch())
    console.log("Total", Total)
    const dataValues = getValues();
    console.log("dataValues", dataValues);

    console.log("counter", counter);
    useEffect(() => {
        // update field array when ticket number changed
        const newVal = parseInt(counter || 1);
        const oldVal = fields.length;
        if (newVal > oldVal) {
            // append slots to field array
            for (let i = oldVal; i < newVal; i++) {
                append({
                    room_type_id: "",
                    room_view_id: "",
                    meal_id: "",
                    count: "",
                    vat: "",
                    total: "",
                    nights: [
                        {
                            night_id: "",
                            selling_price: "",
                            date: "",
                            isExtraBed: false,
                        },
                    ],
                });
            }
        } else {
            // remove slots from field array
            for (let i = oldVal; i > newVal; i--) {
                remove(i - 1);
            }
        }
    }, [plus, minus, counter]);

    function onSubmit(data) {
        const from_date = data.from_date[0].format();
        const to_date = data.from_date[1].format();
        const from_hijri_date = data.from_hijri_date[0].format();
        const to_hijri_date = data.from_hijri_date[1].format();
        const optional_date = data.optional_date.format();
        console.log("from_date", from_date)
        console.log("to_date", to_date)
        console.log("from_hijri_date", from_hijri_date)
        console.log("to_hijri_date", to_hijri_date)
        data.from_date = from_date;
        data.to_date = to_date;
        data.to_hijri_date = to_hijri_date;
        data.from_hijri_date = from_hijri_date;
        data.optional_date = optional_date;
        // Delete 
        delete data["minus"];
        delete data["plus"];
        console.log("datasssss", data)
    }

    const convertDate = (date, type) => {
        if (type == "hijri") {
            const date_from = new DateObject({
                calendar: arabic,
                date: `${date[0]}`,
            });
            const date_to = new DateObject({
                calendar: arabic,
                date: `${date[1]}`,
            });

            date_from.convert(gregorian, gregorian_en);
            date_to.convert(gregorian, gregorian_en);
            // console.log("date_fromhijri", date_from.format())
            // console.log("date_tohijri", date_to.format())
            setGetGregorianDate(([new DateObject(date_from).subtract(1, "days"), new DateObject(date_to).subtract(1, "days")]));
            setGetHijiriDate(date);
            if (date_from) {
                handleOptionalDate(date_from)
            }
        }
        if (type == "gregorian") {
            const date_from = new DateObject({
                calendar: gregorian,
                date: `${date[0]}`,
            });
            const date_to = new DateObject({
                calendar: gregorian,
                date: `${date[1]}`,
            });

            date_from.convert(arabic, arabic_en);
            date_to.convert(arabic, arabic_en);
            setGetGregorianDate(date);
            setGetHijiriDate([new DateObject(date_from).add(1, "days"), new DateObject(date_to).add(1, "days")]);
            if (date[0]) {
                handleOptionalDate(date[0])
            }


        }

    };
    const convertHijriDate = (date) => {
        console.log("convertHijriDate", date.format())
        const dateConvert = new DateObject({
            calendar: gregorian,
            date: `${date}`,
        });

        dateConvert.convert(arabic, arabic_en);
        console.log("dateConvert", dateConvert.format())

        return dateConvert;

    };

    const handleOptionalDate = (dateFrom) => {
        const todayDate = new DateObject().add(4, "days");
        const dateObjects = [dateFrom, todayDate]

        const allDatesInRange = getAllDatesInRange(dateObjects)
        var copiedDate1 = new DateObject(dateFrom);
        var copiedDate2 = new DateObject(dateFrom);
        if (allDatesInRange.length > 0) {
            setOptionalDate(copiedDate1)
            setOptionalDateMinDate(copiedDate1)
        }
        else if (allDatesInRange.length == 0) {
            setOptionalDate(copiedDate1.subtract(5, "days"))
            setOptionalDateMinDate(copiedDate2.subtract(5, "days"))
        }
    }
    return (
        <div className="container">
            <h1>Create Reservation</h1>
            {/* <button
                type="button"
                onClick={() => {
                    const values = getValues(); // { test: "test-input", test1: "test1-input" }
                    const singleValue = getValues("hotel_id"); // "test-input"
                    console.log("values.slots", values.slots)
                    console.log("values", values.slots.map(e => e.total))
                    console.log("singleValue", singleValue)
                    // const multipleValues = getValues(["test", "test1"]);
                    // ["test-input", "test1-input"]
                }}
            >
                Get Values
            </button> */}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row m-2 p-3 bg-white">
                    <div className="col-md-3 col-12">
                        <div className="form-group">
                            <label htmlFor={"hotel_id"}>Hotels</label>
                            <Controller
                                render={({ field: { onChange, value } }) => (
                                    <Select
                                        placeholder="Select Hotel"
                                        options={hotelsList?.data?.map((list) => ({
                                            value: list?.id,
                                            label: list?.brand,
                                        }))}
                                        onChange={(e) => {

                                            // onChange's arg will send value into hook form
                                            onChange(e.value);
                                        }}
                                        // make sure we remain the corect format for the controlled component
                                        required
                                        classNamePrefix="Select"
                                        maxMenuHeight="200px"
                                    />
                                )}
                                name="hotel_id"
                                control={control}
                            />

                            {/* errors will return when field validation fails  */}
                            {errors["hotel_id"] && <span>This field is required</span>}
                        </div>
                    </div>
                    <div className="col-md-3 col-12">
                        <div className="form-group">
                            <label htmlFor={"client_id"}>Clients</label>
                            <Controller
                                render={({ field: { onChange, value } }) => (
                                    <Select
                                        placeholder="Select Client"
                                        options={clients?.data?.map((client) => ({
                                            value: client?.id,
                                            label: client?.name,
                                        }))}
                                        onChange={(e) => {
                                            // onChange's arg will send value into hook form
                                            onChange(e.value);
                                        }}
                                        // make sure we remain the corect format for the controlled component
                                        required
                                        classNamePrefix="Select"
                                    />
                                )}
                                name="client_id"
                                control={control}
                            />

                            {/* errors will return when field validation fails  */}
                            {errors["client_id"] && <span>This field is required</span>}
                        </div>
                    </div>
                    <div className="col-md-3 col-12">
                        <div className="form-group">
                            <label htmlFor={"payment_method_id"}>Payment Methods</label>
                            <Controller
                                render={({ field: { onChange, value } }) => (
                                    <Select
                                        placeholder="Select Payment Method"
                                        options={paymentMethods?.data?.map((paymentMethod) => ({
                                            value: paymentMethod?.id,
                                            label: paymentMethod?.title,
                                        }))}
                                        onChange={(e) => {
                                            // onChange's arg will send value into hook form
                                            onChange(e.value);
                                        }}
                                        // make sure we remain the corect format for the controlled component
                                        required
                                        classNamePrefix="Select"
                                        maxMenuHeight="200px"
                                    />
                                )}
                                name="payment_method_id"
                                control={control}
                            />

                            {/* errors will return when field validation fails  */}
                            {errors["payment_method_id"] && (
                                <span>This field is required</span>
                            )}
                        </div>
                    </div>
                    <div className="col-md-3 col-12">
                        <div className="form-group">
                            <label htmlFor={"reservation_status_id"}>Reservation Status</label>
                            <Controller
                                render={({ field: { onChange, value } }) => (
                                    <Select
                                        placeholder="Select Reservation Status"
                                        options={reservationStatus?.data?.map((status) => ({
                                            value: status?.id,
                                            label: status?.title,
                                        }))}
                                        onChange={(e) => {
                                            // onChange's arg will send value into hook form
                                            onChange(e.value);
                                        }}
                                        // make sure we remain the corect format for the controlled component
                                        required
                                        classNamePrefix="Select"
                                        maxMenuHeight="200px"
                                    />
                                )}
                                name="reservation_status_id"
                                control={control}
                            />

                            {/* errors will return when field validation fails  */}
                            {errors["payment_method_id"] && (
                                <span>This field is required</span>
                            )}
                        </div>
                    </div>
                    <div className="col-md-4 mt-2 col-12">
                        <div className="form-group">
                            <label htmlFor={`from_hijri_date`}>
                                From-To Gregorian Dates
                            </label>
                            <Controller
                                control={control}
                                defaultValue={getGregorianDate}
                                name={`from_date`}
                                {...register(`from_date`, {
                                    required: false,
                                })}
                                render={({ field: { onChange, value } }) => (
                                    <>
                                        <DatePicker
                                            render={<InputIcon />}
                                            value={getGregorianDate}
                                            onChange={(date) => {
                                                setAllDates(getAllDatesInRange(date))
                                                convertDate(date, "gregorian");
                                                // setHijriDate(date);
                                                // console.log("Daterrr", date);
                                                onChange(date);
                                            }}
                                            selected={getGregorianDate}
                                            format={"YYYY-MM-DD"}
                                            range
                                            rangeHover
                                            plugins={[<DatePanel />]}
                                            calendar={gregorian}
                                            locale={gregorian_en}
                                            name={`from_date`}
                                            // className="rmdp-mobile"
                                            // mobileButtons={[
                                            //     {
                                            //         label: "Reset",
                                            //         type: "button",
                                            //         className: "rmdp-button rmdp-action-button",
                                            //         onClick: () => setValues({}),
                                            //     },
                                            // ]}
                                            minDate={new DateObject()}
                                        // format={language === "en" ? "MM/DD/YYYY" : "YYYY/MM/DD"}
                                        />
                                    </>
                                )}
                            />
                        </div>
                    </div>
                    <div className="col-md-4 mt-2 col-12">
                        <div className="form-group">
                            <label htmlFor={`from_hijri_date`}>
                                From-To Hijri Dates
                            </label>
                            <Controller
                                control={control}
                                defaultValue={getHijiriDate}
                                name={`from_hijri_date`}
                                {...register(`from_hijri_date`, {
                                    required: false,
                                })}
                                render={({ field: { onChange, value } }) => (
                                    <>
                                        <DatePicker
                                            render={<InputIcon />}

                                            value={getHijiriDate}
                                            onChange={(date) => {
                                                convertDate(date, "hijri");
                                                // setHijriDate(date);
                                                onChange(date);
                                            }}
                                            selected={getHijiriDate}
                                            format={"YYYY-MM-DD"}
                                            range
                                            rangeHover
                                            plugins={[<DatePanel />]}
                                            calendar={arabic}
                                            locale={arabic_en}
                                            name={`from_hijri_date`}
                                            // className="rmdp-mobile"
                                            // mobileButtons={[
                                            //     {
                                            //         label: "Reset",
                                            //         type: "button",
                                            //         className: "rmdp-button rmdp-action-button",
                                            //         onClick: () => setValues({}),
                                            //     },
                                            // ]}
                                            // currentDate={new DateObject().add(5, "days")}
                                            mapDays={({ date, today }) => {
                                                const newDate = convertHijriDate(new DateObject().add(1, "days"));
                                                console.log("zccccxxxzzzz", newDate.format())
                                                today.day = newDate;
                                                // const newDate = new DateObject().add(5, "days")
                                                // date.today = { newDate }
                                            }}
                                            // today={new DateObject().add(5, "days")}
                                            minDate={new DateObject().add(1, "days")}
                                        // format={language === "en" ? "MM/DD/YYYY" : "YYYY/MM/DD"}
                                        />
                                    </>
                                )}
                            />
                        </div>
                    </div>
                    <div className="col-md-4 mt-2 col-12">
                        <div className="form-group">
                            <label htmlFor={`optional_date`}>
                                Optional Dates
                            </label>
                            <Controller
                                control={control}
                                defaultValue={getGregorianDate}
                                name={`optional_date`}
                                {...register(`optional_date`, {
                                    required: false,
                                })}
                                render={({ field: { onChange, value } }) => (
                                    <>
                                        <DatePicker
                                            render={<InputIcon />}
                                            value={optionalDate}
                                            onChange={(date) => {
                                                // convertDate(date, "gregorian");
                                                // setHijriDate(date);
                                                // console.log("Daterrr", date);
                                                onChange(date);
                                            }}
                                            selected={optionalDate}
                                            format={"YYYY-MM-DD"}
                                            // plugins={[<DatePanel />]}
                                            calendar={gregorian}
                                            locale={gregorian_en}
                                            name={`optional_date`}
                                            // className="rmdp-mobile"
                                            // mobileButtons={[
                                            //     {
                                            //         label: "Reset",
                                            //         type: "button",
                                            //         className: "rmdp-button rmdp-action-button",
                                            //         onClick: () => setValues({}),
                                            //     },
                                            // ]}
                                            minDate={optionalDateMinDate}
                                        // format={language === "en" ? "MM/DD/YYYY" : "YYYY/MM/DD"}
                                        />
                                    </>
                                )}
                            />
                        </div>
                    </div>
                </div>
                {fields.map((item, i) => {
                    return (
                        <div key={i} className="list-group list-group-flush">

                            <div className="row m-2 p-3 bg-white">
                                <div className="mt-3 col-md-1 col-sm-12">
                                    <div className="m-auto d-flex justify-content-evenly align-items-center">
                                        <div onClick={handleDetails}>
                                            {showDetails ? (
                                                <IoIosArrowUp className="mb-1 mx-auto" />
                                            ) : (
                                                <IoIosArrowDown className="mb-1 mx-auto" />
                                            )}
                                        </div>
                                        <button
                                            name="plus"
                                            className="btn"
                                            {...register("plus")}
                                            onClick={() =>
                                                counter >= 1 ? setCounter(counter + 1) : setCounter(1)
                                            }
                                            type="button"
                                        >
                                            <AiOutlinePlusCircle />
                                        </button>
                                        <button
                                            name="minus"
                                            className="btn text-danger"
                                            {...register("minus")}
                                            onClick={() =>
                                                counter == 1 ? setCounter(1) : setCounter(counter - 1)
                                            }
                                            type="button"
                                        >
                                            <RiDeleteBin6Line />
                                        </button>
                                    </div>
                                </div>
                                <div className="col-md-2 col-12">
                                    <div className="form-group">
                                        <label htmlFor={"room_type_id"}>Room Types</label>
                                        <Controller
                                            control={control}
                                            name={`slots[${i}]room_type_id`}
                                            {...register(`slots.${i}.room_type_id`, {
                                                required: true,
                                            })}
                                            render={({ field: { onChange, value } }) => (
                                                <Select
                                                    placeholder="Select..."
                                                    options={roomTypes?.data?.map((roomType) => ({
                                                        value: roomType?.id,
                                                        label: roomType?.type,
                                                    }))}
                                                    onChange={(e) => {
                                                        // onChange's arg will send value into hook form
                                                        onChange(e.value);
                                                    }}
                                                    // make sure we remain the corect format for the controlled component
                                                    required
                                                    classNamePrefix="Select"
                                                    maxMenuHeight="150px"
                                                />
                                            )}
                                        />

                                        {/* errors will return when field validation fails  */}
                                        {errors[`slots[${i}]room_type_id`] && (
                                            <span>This field is required</span>
                                        )}
                                    </div>
                                </div>
                                <div className="col-md-2 col-12">
                                    <div className="form-group">
                                        <label htmlFor={"role"}>Room View</label>
                                        <Controller
                                            control={control}
                                            name={`slots[${i}]room_view_id`}
                                            {...register(`slots.${i}.room_view_id`, {
                                                required: true,
                                            })}
                                            render={({ field: { onChange, value } }) => (
                                                <Select
                                                    placeholder="Select..."
                                                    options={roomViews?.data?.map((roomView) => ({
                                                        value: roomView?.id,
                                                        label: roomView?.view,
                                                    }))}
                                                    onChange={(e) => {
                                                        // onChange's arg will send value into hook form
                                                        onChange(e.value);
                                                    }}
                                                    // make sure we remain the corect format for the controlled component
                                                    required
                                                    classNamePrefix="Select"
                                                    maxMenuHeight="150px"
                                                />
                                            )}
                                        />

                                        {/* errors will return when field validation fails  */}
                                        {errors[`slots[${i}]room_view_id`] && (
                                            <span>This field is required</span>
                                        )}
                                    </div>
                                </div>
                                <div className="col-md-2 col-12">
                                    <div className="form-group">
                                        <label htmlFor={`slots[${i}]meal_id`}>Meals</label>
                                        <Controller
                                            control={control}
                                            name={`slots[${i}]meal_id`}
                                            {...register(`slots.${i}.meal_id`, {
                                                required: true,
                                            })}
                                            render={({ field: { onChange, value } }) => (
                                                <Select
                                                    name={`slots[${i}]meal_id`}
                                                    placeholder="Select..."
                                                    options={meals?.data?.map((meal) => ({
                                                        value: meal?.id,
                                                        label: meal?.name,
                                                    }))}
                                                    onChange={(e) => {
                                                        // onChange's arg will send value into hook form
                                                        onChange(e.value);
                                                    }}
                                                    // make sure we remain the corect format for the controlled component
                                                    required
                                                    classNamePrefix="Select"
                                                    maxMenuHeight="150px"
                                                />
                                            )}
                                        />

                                        {/* errors will return when field validation fails  */}
                                        {errors[`slots[${i}]meal_id`] && (
                                            <span>This field is required</span>
                                        )}
                                    </div>
                                </div>
                                <div className="col-md-2 col-12">
                                    <div className="form-group">
                                        <label htmlFor={`slots[${i}]count`}>Rooms No.</label>
                                        {/* register your input into the hook by invoking the "register" function */}
                                        <input
                                            name={`slots[${i}]count`}
                                            {...register(`slots.${i}.count`, {
                                                required: true,
                                            })}
                                            className="form-control"
                                            id={`slots[${i}]count`}
                                            type="number"
                                            placeholder={"Rooms No."}
                                        />
                                        {/* errors will return when field validation fails  */}
                                        {errors[`slots[${i}]count`] && (
                                            <span>This field is required</span>
                                        )}

                                    </div>

                                </div>
                                <div className="col-md-1 col-sm-12">
                                    <label htmlFor={`slots[${i}]guests`}>Guest List</label>
                                    <BsFilePerson
                                        // onClick={() => setShowGuestsPopup((prev) => !prev)}
                                        className="guestName-icon"
                                    />
                                </div>
                                <div class="col-md-2 col-12">
                                    <span
                                        name={`slots.${i}.total`}
                                        {...register(`slots.${i}.total`)}
                                    >
                                        Total: $500
                                    </span>
                                    <br />
                                    <span name={`slots.${i}.vat`} {...register(`slots.${i}.vat`)}>
                                        Vat: $50
                                    </span>
                                </div>
                            </div>
                            <div
                                className={`row ${showDetails ? "details-div" : "hide-details-div"
                                    }`}
                            >
                                {
                                    allDates?.map((date, i) => {
                                        return (
                                            <div className="night-div row mx-0 my-2">
                                                <div className="action-div col-md-2 col-sm-12">
                                                    <span>{date.format()}</span>
                                                </div>

                                                <div className="col-md-3 col-sm-12">
                                                    <label className="filter-lable">Extras</label>
                                                </div>

                                                <div className="price-div col-md-3 col-sm-12">
                                                    <div>
                                                        <span className="m-2">Night Price:</span>
                                                    </div>
                                                </div>
                                                <div className="extras-list col-md-4 col-sm-12">
                                                </div>
                                            </div>
                                        )

                                    })
                                }
                            </div>
                        </div>
                    );
                })}
                <div className="d-flex justify-content-end">
                    <input className="btn bg-gold w-25 " type="submit" />
                </div>
            </form >
        </div >
    );
}

export default CreateReservation;
