import { useEffect, useState } from "react";
import { Controller, useForm, useFieldArray } from "react-hook-form";
import Select from "react-select";
import { useAlert } from "react-alert";
import { useNavigate, useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
/*Icons*/
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiOutlineInfoCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { BsFilePerson } from "react-icons/bs";
/*Icons*/
import DatePicker from "react-multi-date-picker";
import arabic from "react-date-object/calendars/arabic";
import arabic_en from "react-date-object/locales/arabic_en";
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_en from "react-date-object/locales/gregorian_en";
import { DateObject, getAllDatesInRange } from "react-multi-date-picker";
import "react-multi-date-picker/styles/layouts/mobile.css";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import fetcher from "../../../Services/fetcher";
import InputIcon from "react-multi-date-picker/components/input_icon";
import "./index.css";
import { FaPen } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import useToken from "../../../customHooks/useToken";
import useSimplePost from "../../../customHooks/useSimplePost";
import ReactTooltip from "react-tooltip";
import PriceDetailsPopup from "../../../Components/PriceDetailsPopup";

function EditReservation() {
    const { resId } = useParams();
    console.log("resId", resId)
    //Start Fetch Data
    const [hotelsList, setHotelsList] = useState();
    const [clients, setClients] = useState();
    const [paymentMethods, setPaymentMethods] = useState();
    const [roomTypes, setRoomTypes] = useState();
    const [roomViews, setRoomViews] = useState();
    const [meals, setMeals] = useState([]);
    const [extras, setExtras] = useState([]);
    const [reservationStatus, setReservationStatus] = useState();
    const [lineThrough, setLineThrough] = useState(false);
    const [showPriceBreakdow, setShowPriceBreakdow] = useState(false);
    const [reservationById, setReservationById] = useState(false);
    const [edit, setEdit] = useState(false);

    const handlePricePopup = (isShown) => setShowPriceBreakdow(isShown);

    useEffect(() => {
        fetcher("room-types?limit=1000").then((x) => setRoomTypes(x));
        fetcher("room-views?limit=1000").then((x) => setRoomViews(x));
        fetcher("reservation-status").then((x) => setReservationStatus(x));
    }, []);
    useEffect(() => {
        fetcher("hotels/list?limit=1000").then((x) => setHotelsList(x));
    }, [hotelsList?.message])
    useEffect(() => {
        fetcher("clients?limit=1000").then((x) => setClients(x));
    }, [clients?.message])
    useEffect(() => {
        fetcher("payment-method?limit=1000").then((x) => setPaymentMethods(x));
    }, [paymentMethods?.message])
    useEffect(() => {
        if (resId !== "undefined") {
            fetcher(`reservations/${resId}`).then((x) => setReservationById(x?.data));
        }

    }, [resId])
    useEffect(() => {
        console.log("hotel?.id", hotelsList)
        console.log("reservationById?.hotel_id", reservationById?.hotel_id)
        console.log('sadastt', hotelsList?.data?.filter(hotel => hotel?.id == reservationById?.hotel_id))
        // setValue("hotel_id", hotelsList.filter(hotel => hotel?.id == reservationById?.hotel_id))
        // setValue("phone", hotel?.phone);
        // setValue("country", hotel?.city?.country?.id);
        // setValue("city_id", hotel?.city?.id);
        // setValue("hotel_persons", hotel?.hotel_persons);
        // setValue("isActive", hotel?.isActive === true ? 1 : 0);
        // setValue("isVat", hotel?.isVat === true ? 1 : 0);
    }, [reservationById, hotelsList]);
    useEffect(() => {
        console.log("reservationById", reservationById)
    }, [reservationById])

    // useEffect(() => {
    //     fetcher("hotels/list?limit=1000").then((x) => setHotelsList(x));
    //     fetcher("clients?limit=1000").then((x) => setClients(x));
    //     fetcher("payment-method?limit=1000").then((x) => setPaymentMethods(x));
    //     fetcher("room-types?limit=1000").then((x) => setRoomTypes(x));
    //     fetcher("room-views?limit=1000").then((x) => setRoomViews(x));
    //     fetcher("reservation-status").then((x) => setReservationStatus(x));
    // }, [hotelsList?.message, clients?.message, paymentMethods?.message]);
    //End Fetch Data

    // Start React Hooks Form
    const [nightsArr, setNightsArr] = useState([]);

    const { user } = useToken();
    const { formPost } = useSimplePost();
    const {
        register,
        resetField,
        control,
        handleSubmit,
        reset,
        formState,
        watch,
        getValues,
        setValue,
    } = useForm({
        defaultValues: {
            status_id: reservationStatus?.data?.slice(0, 1).map((status) => ({
                value: status?.id,
                label: status?.title,
            })),
            user_id: "",
            slots: [
                {
                    room_type_id: "",
                    room_view_id: "",
                    meal_id: "",
                    meal_price: 0,
                    total_extras_price: 0,
                    total_nights_price: 0,
                    room_duplicate: 1,
                    vat: 0,
                    availability: "",
                    sub_total: 0,
                    nights: [],
                    guests: [],
                    showDetails: false,
                },
            ],
        },
    });

    const { errors } = formState;

    // Start useFieldArray Definations

    const {
        fields: slotsFields,
        append: slotsAppend,
        remove: slotsRemove,
    } = useFieldArray({
        name: "slots",
        control,
    });

    // End useFieldArray Definations

    // Start form validation rules
    const validationSchema = Yup.object().shape({
        dsfsd: Yup.array().of(
            Yup.object().shape({
                meal_id: Yup.mixed().required().label("Selected Room Type"),
                room_duplicate: Yup.number().required("No.Rooms is required"),
            })
        ),
    });

    const formOptions = { resolver: yupResolver(validationSchema) };
    // End form validation rules
    //End React Hooks Form

    //Start Get URL query Start Date End Date
    const alert = useAlert();
    const navigate = useNavigate();
    const search = useLocation().search;
    const searchParams = new URLSearchParams(search);
    //End Get URL query Start Date End Date

    // Start useState
    const [getGregorianDate, setGetGregorianDate] = useState([
        new DateObject().subtract(0, "days"),
        new DateObject().add(5, "days"),
    ]);
    const [getHijiriDate, setGetHijiriDate] = useState([
        new DateObject().add(1, "days"),
        new DateObject().add(5, "days"),
    ]);
    const [optionalDate, setOptionalDate] = useState(new DateObject());
    const [optionalDateMinDate, setOptionalDateMinDate] = useState(
        new DateObject()
    );

    const [allDates, setAllDates] = useState([]);
    const [hotelId, setHotelId] = useState();

    /*Start Actions*/
    /*Start Actions State */
    const [isDisabled, setIsDisabled] = useState(false);
    const [showGuestsPopup, setShowGuestsPopup] = useState(false);
    const [slotIdClicked, seSlotIdClicked] = useState(0);
    const [roomCountPopup, setRoomCountPopup] = useState([]);
    /*End Actions State */

    //Start Page First Intlization
    useEffect(() => {
        if (searchParams.get("startDate")) {
            const calendarGregorianDates = [
                new DateObject(searchParams.get("startDate")),
                new DateObject(searchParams.get("endDate")),
            ];

            setGetGregorianDate(calendarGregorianDates);
            convertDate(calendarGregorianDates, `gregorian`);
            const AllDatesRanges = getAllDatesInRange(calendarGregorianDates);
            setAllDates(AllDatesRanges);
        } else {
            const AllDatesRanges = getAllDatesInRange(getGregorianDate);
            setAllDates(AllDatesRanges);
        }
    }, []);
    useEffect(() => {
        const slotValues = watch("slots");
        nightsArr.length > 0 &&
            allDates.length > 0 &&
            slotValues?.map((slot, i) => {
                setValue(`slots[${i}].nights]`, nightsArr);
                slot.nights = nightsArr;
            });
    }, [nightsArr, allDates]);

    useEffect(() => {
        const slots = getValues(`slots`);
        slots?.map((slot, i) => getAvalibility(hotelId, i));
    }, [getGregorianDate, hotelId]);

    const getAvalibility = async (hoteldd, slotId) => {
        console.log("hoteldd", hoteldd)
        const slots = await getValues(`slots[${slotId}]`);
        if (slots?.room_type_id && slots?.room_view_id) {
            const avalibiltyObj = {
                hotel_id: hoteldd ? hoteldd : "",
                from: watch("from_date[0]").format(),
                to: watch("from_date[1]").format(),
                room_type: slots?.room_type_id ? slots?.room_type_id : "",
                room_view: slots?.room_view_id ? slots?.room_view_id : "",
            };
            const fetchAvalibilty = await fetcher(`availability?`, avalibiltyObj);
            let roomsStock =
                fetchAvalibilty.data.length > 0
                    ? fetchAvalibilty?.data?.reduce(
                        (sub_total, currentItem) =>
                        (sub_total =
                            Number(sub_total) + Number(currentItem.min_availability)),
                        0
                    )
                    : 0;

            let slotTotalPrice =
                fetchAvalibilty.data.length > 0
                    ? fetchAvalibilty?.data[0]?.nights?.reduce(
                        (sub_total, currentItem) =>
                        (sub_total =
                            Number(sub_total) + Number(currentItem.selling_price)),
                        0
                    )
                    : 0;

            setValue(`slots.${slotId}.availability`, roomsStock);
            setValue(`slots.${slotId}.sub_total`, Number(slotTotalPrice));
            setValue(`slots.${slotId}.vat`, Number(slotTotalPrice));

            setValue(
                `slots.${slotId}.nights`,
                fetchAvalibilty?.data[0]?.nights?.map((night) => ({
                    night_id: night?.id,
                    selling_price: night?.selling_price,
                    old_price: night?.selling_price,
                    date: night?.date,
                    hijri_date: night?.hijri_date,
                    edit: false,
                    extras: [],
                }))
            );

            setExtras(fetchAvalibilty?.data[0]?.extras);
            setMeals(fetchAvalibilty?.data[0]?.meals);
        }
    };
    const calculateNight = async (e, slotId) => {
        const slots = await getValues(`slots[${slotId}]`);
        let nightsExtrasPrice = await slots?.nights?.reduce(
            (sub_total, currentItem) =>
            (sub_total =
                Number(sub_total) +
                (currentItem.extras[0] ? Number(currentItem.extras[0]?.price) : 0)),
            0
        );
        setValue(`slots.${slotId}.total_extras_price`, Number(nightsExtrasPrice));
    };
    const calculateNightPrice = async (slotId) => {
        const slots = await getValues(`slots[${slotId}]`);
        let slotTotalPrice = await slots?.nights?.reduce(
            (sub_total, currentItem) =>
                (sub_total = Number(sub_total) + Number(currentItem.selling_price)),
            0
        );
        setValue(`slots.${slotId}.sub_total`, slotTotalPrice);
    };

    const handleGuestsPopup = async (slotId) => {
        const slots = await getValues(`slots[${slotId}]`);
        console.log("slotsooooo", slots);
        //Open Popup
        //SetSlotId clicked
        seSlotIdClicked(slotId);
        setShowGuestsPopup(true);
        //get count from this slotId
        const roomCount = await slots?.room_duplicate;
        let arr = [];
        for (let i = 0; i < Number(roomCount); i++) {
            arr.push(Number(i));
        }
        setRoomCountPopup(arr);
        console.log("roomCount", roomCount);
    };

    useEffect(() => {
        setValue("from_date", getGregorianDate);
        setValue("from_hijri_date", getHijiriDate);
        setValue("option_date", optionalDate);
    }, [getGregorianDate, getHijiriDate]);
    //End Page First Intlization

    //Start Functions Helper
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
            setGetGregorianDate([
                new DateObject(date_from).subtract(1, "days"),
                new DateObject(date_to).subtract(1, "days"),
            ]);
            setGetHijiriDate(date);
            if (date_from) {
                handleOptionalDate(date_from);
                getAvalibility(
                    "",
                    "",
                    new DateObject(date_from).subtract(1, "days").format(),
                    new DateObject(date_to).subtract(1, "days").format()
                );
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
            setGetHijiriDate([
                new DateObject(date_from).add(1, "days"),
                new DateObject(date_to).add(1, "days"),
            ]);
            if (date[0]) {
                handleOptionalDate(date[0]);
                getAvalibility("", "", date[0].format(), date[1].format());
            }
        }
    };
    const convertHijriDate = (date) => {
        console.log("convertHijriDate", date.format());
        const dateConvert = new DateObject({
            calendar: gregorian,
            date: `${date}`,
        });

        dateConvert.convert(arabic, arabic_en);
        return dateConvert;
    };

    const handleOptionalDate = (dateFrom) => {
        const todayDate = new DateObject().add(4, "days");
        const dateObjects = [dateFrom, todayDate];

        const allDatesInRange = getAllDatesInRange(dateObjects);
        var copiedDate1 = new DateObject(dateFrom);
        var copiedDate2 = new DateObject(dateFrom);
        // var copiedDate3 = new DateObject(dateFrom);
        if (allDatesInRange.length > 0) {
            setOptionalDate(copiedDate1);
            setOptionalDateMinDate(copiedDate1);
            // setOptionalDateMaxDate(copiedDate2.add(5, "days"))
        } else if (allDatesInRange.length == 0) {
            setOptionalDate(copiedDate1.subtract(5, "days"));
            setOptionalDateMinDate(copiedDate2.subtract(5, "days"));
            // setOptionalDateMaxDate(copiedDate3.add(5, "days"))
        }
    };
    //End Fuunctions Helper

    console.log(watch()?.slots);

    //Start Submit Function
    const onSubmit = async (data) => {
        data.user_id = user?.id;
        data.confirmation_number = Number(data.confirmation_number);
        //Start Calculate Total
        const subTotal = data?.slots?.map((slot) => {
            const SlotTotal =
                (Number(slot.meal_price) +
                    Number(slot.sub_total) +
                    Number(slot.total_extras_price)) *
                Number(slot.room_duplicate);
            slot.sub_total = SlotTotal;
            slot.vat = SlotTotal * 0.14;
            slot.total = slot.sub_total + slot.vat;
            slot.room_duplicate = Number(slot.room_duplicate);

            return SlotTotal;
        });

        data.sub_total = subTotal.reduce(
            (sub_total, currentItem) =>
                (sub_total = Number(sub_total) + Number(currentItem)),
            0
        );
        data.vat = data.sub_total * 0.14;
        data.total = data.sub_total + data.vat;

        //End Calculate Total
        //Start Convert Dates
        const from_date = data.from_date[0].format();
        const to_date = data.from_date[1].format();
        const from_hijri_date = data.from_hijri_date[0].format();
        const to_hijri_date = data.from_hijri_date[1].format();
        const option_date = data.option_date.format();
        data.from_date = from_date;
        data.to_date = to_date;
        data.to_hijri_date = to_hijri_date;
        data.from_hijri_date = from_hijri_date;
        data.option_date = option_date;
        // End Convert Dates

        data?.slots?.map((slot) => {
            if (slot.guests.length > slot.room_duplicate) {
                for (let i = slot.room_duplicate; i < slot.guests.length + 1; i++) {
                    slot.guests.pop();
                }
                console.log(slot);
            }
            return slot.guests;
        });

        formPost(null, `reservations`, data);

        console.log("datasssss", data);
    };
    //End Submit Function
    const location = useLocation();
    return (
        <div className="container">
            <h1>{location.pathname.includes("create") ? "Create Reservation" : "Edit Reservation"}</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row m-2 p-3 bg-white">
                    <div className="col-md-3 col-12">
                        <div className="form-group">
                            <label htmlFor={"hotel_id"}>Hotels</label>
                            <Controller
                                {...register(`hotel_id`, {
                                    required: true,
                                })}
                                render={({ field: { onChange, value } }) => (
                                    <Select
                                        placeholder="Select Hotel"
                                        options={hotelsList?.data?.map((list) => ({
                                            value: list?.id,
                                            label: list?.brand,
                                        }))}
                                        onChange={(e) => {
                                            setHotelId(e.value)
                                            getAvalibility(e.value, 0);
                                            onChange(e.value);
                                        }}
                                        required
                                        classNamePrefix="Select"
                                        maxMenuHeight="200px"
                                    />
                                )}
                                name="hotel_id"
                                control={control}
                            />

                            {errors["hotel_id"] && (
                                <span className="error">This field is required</span>
                            )}
                        </div>
                    </div>
                    <div className="col-md-3 col-12">
                        <div className="form-group">
                            <label htmlFor={"client_id"}>Client</label>
                            <Controller
                                {...register(`client_id`, {
                                    required: true,
                                })}
                                render={({ field: { onChange, value } }) => (
                                    <Select
                                        placeholder="Select Client"
                                        options={clients?.data?.filter((client => client?.isActive))?.map((client) => ({
                                            value: client?.id,
                                            label: client?.name,
                                        }))}
                                        onChange={(e) => {
                                            onChange(e.value);
                                        }}
                                        required
                                        classNamePrefix="Select"
                                    />
                                )}
                                name="client_id"
                                control={control}
                            />

                            {errors["client_id"] && (
                                <span className="error">This field is required</span>
                            )}
                        </div>
                    </div>

                    {/* <div className="col-md-3 col-12">
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
                {errors["payment_method_id"] && (
                    <span>This field is required</span>
                )}
            </div>
        </div> */}

                    <div className="col-md-3 col-12">
                        <div className="form-group">
                            <label htmlFor={"status_id"}>Reservation Status</label>
                            <Controller
                                {...register(`status_id`, {
                                    required: true,
                                })}
                                render={({ field: { onChange, value } }) => (
                                    <Select
                                        placeholder="Select Status"
                                        options={reservationStatus?.data?.map((status) => ({
                                            value: status?.id,
                                            label: status?.title,
                                        }))}
                                        onChange={(e) => {
                                            e.value == 2 ? setIsDisabled(true) : setIsDisabled(false);
                                            // onChange's arg will send value into hook form
                                            onChange(e.value);
                                        }}
                                        // make sure we remain the corect format for the controlled component
                                        required
                                        classNamePrefix="Select"
                                        maxMenuHeight="200px"
                                    />
                                )}
                                name="status_id"
                                control={control}
                            />

                            {/* errors will return when field validation fails  */}
                            {errors["status_id"] && (
                                <span className="error">This field is required</span>
                            )}
                        </div>
                    </div>
                    <div className="col-md-3 col-12">
                        <div className="form-group">
                            <label htmlFor={"confirmation_number"}>Confirmation No.</label>
                            <input
                                disabled={!isDisabled && "disabled"}
                                name={`confirmation_number`}
                                {...register(`confirmation_number`, {
                                    required: !isDisabled ? false : true,
                                })}
                                className="form-control"
                                id={`confirmation_number`}
                                type="number"
                                placeholder={"Hotel Confirmation No."}
                            />

                            {/* errors will return when field validation fails  */}
                            {errors["confirmation_number"] && (
                                <span className="error">This field is required</span>
                            )}
                        </div>
                    </div>
                    <div className="col-md-4 mt-4 col-12">
                        <div className="form-group">
                            <label htmlFor={`from_hijri_date`}>From-To Gregorian Dates</label>
                            <Controller
                                control={control}
                                defaultValue={getGregorianDate}
                                name={`from_date`}
                                {...register(`from_date`, {
                                    required: true,
                                })}
                                render={({ field: { onChange, value } }) => (
                                    <>
                                        <DatePicker
                                            render={<InputIcon />}
                                            value={getGregorianDate}
                                            onChange={(date) => {
                                                setAllDates(getAllDatesInRange(date));
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
                                            minDate={new DateObject()}
                                            required
                                        />
                                    </>
                                )}
                            />
                            {errors[`from_date`] && (
                                <span className="error">This field is required</span>
                            )}
                        </div>
                    </div>
                    <div className="col-md-4 mt-4 col-12">
                        <div className="form-group">
                            <label htmlFor={`from_hijri_date`}>From-To Hijri Dates</label>
                            <Controller
                                control={control}
                                defaultValue={getHijiriDate}
                                name={`from_hijri_date`}
                                {...register(`from_hijri_date`, {
                                    required: true,
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
                                            mapDays={({ date, today }) => {
                                                const newDate = convertHijriDate(
                                                    new DateObject().add(1, "days")
                                                );
                                                console.log("zccccxxxzzzz", newDate.format());
                                                today.day = newDate;
                                                date.today = { newDate };
                                            }}
                                            minDate={new DateObject().add(1, "days")}
                                            required
                                        />
                                    </>
                                )}
                            />
                        </div>
                        {errors[`from_date`] && (
                            <span className="error">This field is required</span>
                        )}
                        {console.log(errors)}
                    </div>
                    <div className="col-md-4 mt-4 col-12">
                        <div className="form-group">
                            <label htmlFor={`option_date`}>Optional Dates</label>
                            <Controller
                                control={control}
                                defaultValue={getGregorianDate}
                                name={`option_date`}
                                {...register(`option_date`, {
                                    required: true,
                                })}
                                render={({ field: { onChange, value } }) => (
                                    <>
                                        <DatePicker
                                            render={<InputIcon />}
                                            value={optionalDate}
                                            onChange={(date) => {
                                                onChange(date);
                                            }}
                                            selected={optionalDate}
                                            format={"YYYY-MM-DD"}
                                            calendar={gregorian}
                                            locale={gregorian_en}
                                            name={`option_date`}
                                            minDate={optionalDateMinDate}
                                            required
                                        />
                                    </>
                                )}
                            />
                            {errors[`option_date`] && (
                                <span className="error">This field is required</span>
                            )}
                        </div>
                    </div>
                </div>
                {slotsFields.map((slot, slotId) => {
                    return (
                        <div key={slot?.id} className="list-group list-group-flush">
                            <div className="row m-2 p-3 bg-white">
                                <div className="mt-3 col-md-1 col-sm-12">
                                    <div className="m-auto d-flex justify-content-evenly align-items-center">
                                        {watch()?.slots[slotId]?.room_type_id &&
                                            watch()?.slots[slotId]?.room_view_id &&
                                            watch()?.hotel_id && (
                                                <div
                                                    onClick={() => {
                                                        setValue(
                                                            `slots.${slotId}.showDetails`,
                                                            !watch()?.slots[slotId].showDetails
                                                        );
                                                    }}
                                                >
                                                    {watch()?.slots[slotId]?.showDetails ? (
                                                        <IoIosArrowUp className="mb-1 mx-auto" />
                                                    ) : (
                                                        <IoIosArrowDown className="mb-1 mx-auto" />
                                                    )}
                                                </div>
                                            )}
                                        {watch()?.slots[slotId]?.room_type_id &&
                                            watch()?.slots[slotId]?.room_view_id &&
                                            watch()?.hotel_id && (
                                                <button
                                                    className="btn"
                                                    onClick={() => {
                                                        slotsAppend({
                                                            room_type_id: "",
                                                            room_view_id: "",
                                                            meal_id: "",
                                                            meal_price: 0,
                                                            total_extras_price: 0,
                                                            total_nights_price: 0,
                                                            room_duplicate: 1,
                                                            vat: 0,
                                                            availability: "",
                                                            sub_total: 0,
                                                            nights: [],
                                                            guests: [],
                                                        });
                                                    }}
                                                    type="button"
                                                >
                                                    <AiOutlinePlusCircle />
                                                </button>
                                            )}
                                        {slotId !== 0 && (
                                            <button
                                                className="btn text-danger"
                                                onClick={() => slotsRemove(slotId)}
                                                type="button"
                                            >
                                                <RiDeleteBin6Line />
                                            </button>
                                        )}
                                    </div>
                                </div>
                                <div className="col-md-2 col-12">
                                    <div className="form-group">
                                        <label htmlFor={`slots[${slotId}]room_type_id`}>Room Type</label>
                                        <Controller
                                            control={control}
                                            name={`slots.${slotId}.room_type_id`}
                                            {...register(`slots.${slotId}.room_type_id`, {
                                                required: true,
                                            })}
                                            render={({ field: { onChange, value } }) => (
                                                <Select
                                                    placeholder="Select..."
                                                    options={roomTypes?.data?.filter((type => type?.isActive))?.map((roomType) => ({
                                                        value: roomType?.id,
                                                        label: roomType?.type,
                                                    }))}
                                                    onChange={(e) => {
                                                        getAvalibility(hotelId, slotId);
                                                        onChange(e.value);
                                                    }}
                                                    required
                                                    classNamePrefix="Select"
                                                    maxMenuHeight="150px"
                                                />
                                            )}
                                        />
                                        {errors?.slots && errors?.slots[slotId]?.room_type_id && (
                                            <span className="error">This field is required</span>
                                        )}
                                    </div>
                                </div>
                                <div className="col-md-2 col-12">
                                    <div className="form-group">
                                        <label htmlFor={`slots[${slotId}]room_view_id`}>Room View</label>
                                        <Controller
                                            control={control}
                                            name={`slots[${slotId}]room_view_id`}
                                            {...register(`slots.${slotId}.room_view_id`, {
                                                required: true,
                                            })}
                                            render={({ field: { onChange, value } }) => (
                                                <Select
                                                    placeholder="Select..."
                                                    options={roomViews?.data?.filter((view => view?.isActive))?.map((roomView) => ({
                                                        value: roomView?.id,
                                                        label: roomView?.view,
                                                    }))}
                                                    onChange={(e) => {
                                                        getAvalibility(hotelId, slotId);
                                                        onChange(e.value);
                                                    }}
                                                    required
                                                    classNamePrefix="Select"
                                                    maxMenuHeight="150px"
                                                />
                                            )}
                                        />

                                        {errors?.slots && errors?.slots[slotId]?.room_view_id && (
                                            <span className="error">This field is required</span>
                                        )}
                                    </div>
                                </div>
                                <div className="col-md-2 col-12">
                                    <div className="form-group">
                                        <label htmlFor={`slots.${slotId}.meal_id`}>Meals</label>
                                        <Controller
                                            control={control}
                                            name={`slots.${slotId}.meal_id`}
                                            {...register(`slots.${slotId}.meal_id`, {
                                                required: true,
                                            })}
                                            render={({ field: { onChange, value } }) => (
                                                <Select
                                                    name={`slots.${slotId}.meal_id`}
                                                    placeholder="Select..."
                                                    options={meals?.map((meal) => ({
                                                        value: meal?.id,
                                                        label: `${meal?.title} - $${meal?.selling_price}`,
                                                    }))}
                                                    onChange={(e) => {
                                                        setValue(
                                                            `slots[${slotId}].meal_price`,
                                                            Number(
                                                                meals?.find((meal) => meal?.id == e?.value)
                                                                    ?.selling_price
                                                            )
                                                        );
                                                        onChange(e.value);
                                                    }}
                                                    required
                                                    classNamePrefix="Select"
                                                    maxMenuHeight="150px"
                                                />
                                            )}
                                        />

                                        {errors?.slots && errors?.slots[slotId]?.meal_id && (
                                            <span className="error">This field is required</span>
                                        )}
                                    </div>
                                </div>
                                <div className="col-md-2 col-12">
                                    <div className="form-group">
                                        <label htmlFor={`slots[${slotId}]room_duplicate`}>
                                            Rooms Count
                                        </label>
                                        <Controller
                                            control={control}
                                            name={`slots[${slotId}]room_duplicate`}
                                            {...register(`slots[${slotId}].room_duplicate`, {
                                                required: true,
                                            })}
                                            render={({ field: { onChange, value } }) => (
                                                <input
                                                    name={`slots[${slotId}]room_duplicate`}
                                                    {...register(`slots.${slotId}.room_duplicate`, {
                                                        required: true,
                                                        min: 1,
                                                        max: 100,
                                                    })}
                                                    className="form-control"
                                                    id={`slots[${slotId}].room_duplicate`}
                                                    defaultValue={slot?.room_duplicate}
                                                    type="number"
                                                    placeholder={"Rooms Count"}
                                                    min={1}
                                                    max={100}
                                                    onChange={(e) => {
                                                        console.log("edsfsdfsd", Number(e.target.value));
                                                        onChange(Number(e.target.value));
                                                    }}
                                                />
                                            )}
                                        />
                                        {errors?.slots && errors?.slots[slotId]?.room_duplicate && (
                                            <span className="error">This field is required</span>
                                        )}
                                    </div>
                                </div>
                                <div className="col-md-1 col-sm-12 p-0 d-flex flex-column align-items-center">
                                    <label htmlFor={`slots[${slotId}].guests`}>Guest List</label>
                                    <BsFilePerson
                                        onClick={() => handleGuestsPopup(slotId)}
                                        className="guestName-icon"
                                    />
                                    {errors?.slots && errors?.slots[slotId]?.guests && (
                                        <span className="error">This field is required</span>
                                    )}
                                </div>
                                {watch()?.slots[slotId]?.room_type_id &&
                                    watch()?.slots[slotId]?.room_view_id &&
                                    watch()?.hotel_id && (
                                        <div class="col-md-2 col-12">
                                            <span
                                                name={`slots.${slotId}.sub_total`}
                                                {...register(`slots.${slotId}.sub_total`)}
                                            >
                                                SubTotal: ${" "}
                                                {(Number(watch().slots[slotId].meal_price) +
                                                    Number(watch().slots[slotId].sub_total) +
                                                    Number(watch().slots[slotId].total_extras_price)) *
                                                    Number(watch().slots[slotId].room_duplicate)}
                                            </span>
                                            <br />
                                            <span
                                                name={`slots.${slotId}.vat`}
                                                {...register(`slots.${slotId}.vat`)}
                                            >
                                                Vat: ${" "}
                                                {parseFloat(
                                                    (Number(watch().slots[slotId].meal_price) +
                                                        Number(watch().slots[slotId].sub_total) +
                                                        Number(watch().slots[slotId].total_extras_price)) *
                                                    Number(watch().slots[slotId].room_duplicate) *
                                                    0.14
                                                ).toPrecision(5)}
                                            </span>
                                            <br />
                                            <span
                                                name={`slots.${slotId}.total`}
                                                {...register(`slots.${slotId}.total`)}
                                            >
                                                Total: ${" "}
                                                {parseFloat(
                                                    (Number(watch().slots[slotId].meal_price) +
                                                        Number(watch().slots[slotId].sub_total) +
                                                        Number(watch().slots[slotId].total_extras_price)) *
                                                    Number(watch().slots[slotId].room_duplicate) +
                                                    (Number(watch().slots[slotId].meal_price) +
                                                        Number(watch().slots[slotId].sub_total) +
                                                        Number(
                                                            watch().slots[slotId].total_extras_price
                                                        )) *
                                                    Number(watch().slots[slotId].room_duplicate) *
                                                    0.14
                                                ).toPrecision(5)}
                                            </span>
                                        </div>
                                    )}
                                {watch()?.slots[slotId]?.room_type_id &&
                                    watch()?.slots[slotId]?.room_view_id &&
                                    watch()?.hotel_id &&
                                    watch().slots[slotId].availability > 0 && (
                                        <>
                                            <span
                                                className="availability-div"
                                                name={`slots.${slotId}.availability`}
                                                {...register(`slots.${slotId}.availability`)}
                                            >
                                                {watch().slots[slotId].availability} rooms available
                                            </span>
                                            <span className="availability-div">
                                                {watch().slots[slotId].nights?.length}{" "}
                                                {watch().slots[slotId].nights?.length == 1
                                                    ? "night available"
                                                    : "nights available"}
                                            </span>
                                        </>
                                    )}
                                {watch()?.slots[slotId]?.room_type_id &&
                                    watch()?.slots[slotId]?.room_view_id &&
                                    watch()?.hotel_id &&
                                    watch().slots[slotId].availability === 0 && (
                                        <span className="availability-div">no available rooms</span>
                                    )}
                            </div>
                            <div
                                className={`row ${watch()?.slots[slotId]?.showDetails
                                    ? "details-div mx-2"
                                    : "hide-details-div"
                                    }`}
                                {...register(`slots.${slotId}.nights`)}
                            >
                                {watch()?.slots[slotId]?.nights &&
                                    watch()?.slots[slotId]?.nights?.map((night, nId) => {
                                        return (
                                            <div className="night-div row mx-0 my-2">
                                                <div className="action-div col-md-2 col-sm-12">
                                                    <span className="w-100 text-center">
                                                        {night?.date}
                                                    </span>
                                                    <span className="w-100 text-center">
                                                        {night?.hijri_date}
                                                    </span>
                                                </div>

                                                <div className="col-md-3 col-sm-12">
                                                    <label htmlFor={`night[${nId}]extras`}>
                                                        Add Extra
                                                    </label>
                                                    <Controller
                                                        control={control}
                                                        name={`night[${nId}]extras`}
                                                        {...register(
                                                            `slots.${slotId}.nights[${nId}].extras`
                                                        )}
                                                        render={({ field: { onChange, value } }) => (
                                                            <Select
                                                                isClearable
                                                                name={`slots.${slotId}.nights[${nId}].extras`}
                                                                placeholder="Select Extra"
                                                                options={extras?.map((extra) => ({
                                                                    value: extra?.id,
                                                                    label: `${extra?.title} - $${extra?.selling_price} `,
                                                                }))}
                                                                onChange={(e) => {
                                                                    e !== null
                                                                        ? onChange([
                                                                            {
                                                                                extra_id: e?.value,
                                                                                price: Number(
                                                                                    extras?.find(
                                                                                        (extra) => extra?.id == e?.value
                                                                                    )?.selling_price
                                                                                ),
                                                                            },
                                                                        ])
                                                                        : onChange([]);

                                                                    calculateNight(e, slotId);
                                                                }}
                                                                classNamePrefix="Select"
                                                                maxMenuHeight="150px"
                                                            />
                                                        )}
                                                    />
                                                    {errors[`night[${nId}]extras`] && (
                                                        <span>This field is required</span>
                                                    )}
                                                </div>

                                                <div className=" col-md-3 col-sm-12">
                                                    <label
                                                        htmlFor={`slots[${slotId}].nights[${nId}].selling_price`}
                                                        className=" filter-lable"
                                                    >
                                                        Night Price
                                                    </label>
                                                    <p className={lineThrough && `line-through`}>
                                                        {night?.old_price}
                                                    </p>
                                                </div>
                                                <div className="col-md-4 col-sm-12">
                                                    <label
                                                        htmlFor={`slots[${slotId}].nights[${nId}].selling_price`}
                                                        className=" filter-lable"
                                                    >
                                                        {" "}
                                                        Edit Price
                                                    </label>
                                                    {night?.edit ? (
                                                        <Controller
                                                            control={control}
                                                            name={`slots[${slotId}].nights[${nId}].selling_price`}
                                                            {...register(
                                                                `slots.${slotId}.nights[${nId}].selling_price`
                                                            )}
                                                            render={({ field: { onChange, value } }) => (
                                                                <input
                                                                    {...register(
                                                                        `slots[${slotId}].nights[${nId}].selling_price`
                                                                    )}
                                                                    className="form-control w-50 d-flex"
                                                                    type="number"
                                                                    placeholder={"Night Price:"}
                                                                    onChange={(e) => {
                                                                        calculateNightPrice(slotId);
                                                                        setLineThrough(true);
                                                                        onChange(Number(e.value));
                                                                    }}
                                                                />
                                                            )}
                                                        />
                                                    ) : (
                                                        <>
                                                            <br />
                                                            <FaPen
                                                                className="mx-3"
                                                                onClick={() =>
                                                                    setValue(
                                                                        `slots[${slotId}].nights[${nId}].edit`,
                                                                        true
                                                                    )
                                                                }
                                                            />
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>
                    );
                })}

                <Modal
                    show={showGuestsPopup}
                    onHide={() => setShowGuestsPopup(false)}
                    size="md"
                >
                    <Modal.Header closeButton></Modal.Header>
                    <Modal.Body>
                        <div
                            className="row m-0"
                            {...register(`slots.${slotIdClicked}.guests`, {
                                required: true,
                            })}
                        >
                            <h3>Guests List:</h3>
                            {roomCountPopup &&
                                [...roomCountPopup]?.map((m) => (
                                    <input
                                        {...register(`slots.${slotIdClicked}.guests.${m}.name`, {
                                            required: true,
                                        })}
                                        name={`slots[${slotIdClicked}].guests[${m}].name`}
                                        className="form-control my-2"
                                        type="text"
                                        placeholder={`Guest Name${m}`}
                                        required
                                    />
                                ))}
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            className="btn bg-gold"
                            variant="secondary"
                            onClick={() => setShowGuestsPopup(false)}
                        >
                            Save
                        </Button>
                    </Modal.Footer>
                </Modal>
                <div className="my-5">
                    <div className=" d-flex justify-content-center">
                        <div
                            className="mt-4"
                            data-tip="Price Breakdown"
                            data-place="left"
                            data-type="info"
                            data-effect="solid"
                            data-background-color="#d49e1f"
                            data-text-color="#fff"
                            onClick={() => setShowPriceBreakdow(true)}
                        >
                            <AiOutlineInfoCircle />
                        </div>
                        <div className="total-div">
                            <div>
                                <span> Total: </span>{" "}
                                <span
                                    className="main-color"
                                    name={`total`}
                                    {...register(`total`)}
                                >
                                    {" "}
                                    ${" "}
                                    {parseFloat(
                                        Number(
                                            watch()
                                                ?.slots?.map(
                                                    (slot) =>
                                                        (slot.sub_total +
                                                            slot.meal_price +
                                                            slot.total_extras_price) *
                                                        slot.room_duplicate
                                                )
                                                ?.reduce(
                                                    (sub_total, currentItem) =>
                                                    (sub_total =
                                                        Number(sub_total) + Number(currentItem)),
                                                    0
                                                )
                                        ) +
                                        Number(
                                            watch()
                                                ?.slots?.map(
                                                    (slot) =>
                                                        (slot.sub_total +
                                                            slot.meal_price +
                                                            slot.total_extras_price) *
                                                        slot.room_duplicate
                                                )
                                                ?.reduce(
                                                    (sub_total, currentItem) =>
                                                    (sub_total =
                                                        Number(sub_total) + Number(currentItem)),
                                                    0
                                                ) * 0.14
                                        )
                                    ).toPrecision(5)}
                                </span>
                            </div>
                            <div className="vat">
                                <span>SubTotal: </span>{" "}
                                <span name={`sub_total`} {...register(`sub`)}>
                                    $
                                    {Number(
                                        watch()
                                            ?.slots?.map(
                                                (slot) =>
                                                    (slot.sub_total +
                                                        slot.meal_price +
                                                        slot.total_extras_price) *
                                                    slot.room_duplicate
                                            )
                                            ?.reduce(
                                                (sub_total, currentItem) =>
                                                    (sub_total = Number(sub_total) + Number(currentItem)),
                                                0
                                            )
                                    )}
                                </span>
                            </div>
                            <div className="vat">
                                <span>Vat: </span>{" "}
                                <span name={`vat`} {...register(`vat`)}>
                                    $
                                    {parseFloat(
                                        Number(
                                            watch()
                                                ?.slots?.map(
                                                    (slot) =>
                                                        (slot.sub_total +
                                                            slot.meal_price +
                                                            slot.total_extras_price) *
                                                        slot.room_duplicate
                                                )
                                                ?.reduce(
                                                    (sub_total, currentItem) =>
                                                    (sub_total =
                                                        Number(sub_total) + Number(currentItem)),
                                                    0
                                                ) * 0.14
                                        )
                                    ).toPrecision(5)}
                                </span>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-confirm w-50 my-3">
                            Update
                            {/* {location.pathname.includes("create") ? "Create" : "Edit"} */}
                            {/* <input className="btn bg-gold w-25 " type="submit" value={location.pathname.includes("create") ?  "Create" : "Edit"} /> */}
                        </button>
                    </div>
                    {showPriceBreakdow && (
                        <PriceDetailsPopup
                            handlePricePopup={handlePricePopup}
                            Show={showPriceBreakdow}
                            slots={watch()?.slots}
                            subTotal={Number(
                                watch()
                                    ?.slots?.map(
                                        (slot) =>
                                            (slot.sub_total +
                                                slot.meal_price +
                                                slot.total_extras_price) *
                                            slot.room_duplicate
                                    )
                                    ?.reduce(
                                        (sub_total, currentItem) =>
                                            (sub_total = Number(sub_total) + Number(currentItem)),
                                        0
                                    )
                            )}
                            vat={Number(
                                parseFloat(
                                    Number(
                                        watch()
                                            ?.slots?.map(
                                                (slot) =>
                                                    (slot.sub_total +
                                                        slot.meal_price +
                                                        slot.total_extras_price) *
                                                    slot.room_duplicate
                                            )
                                            ?.reduce(
                                                (sub_total, currentItem) =>
                                                    (sub_total = Number(sub_total) + Number(currentItem)),
                                                0
                                            ) * 0.14
                                    )
                                ).toPrecision(5)
                            )}
                        />
                    )}
                    <ReactTooltip />
                </div>
            </form>
        </div>
    );
}

export default EditReservation;
