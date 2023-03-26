const reservation = [
  {
    id: 1,
    user_id: 2,
    client_id: 2,
    payment_method_id: 1,
    hotel_id: 1,
    slots: [
      {
        id: 1,
        to_date: "2022-06-12",
        from_date: "2022-06-11",
        to_hijri_date: "1443-11-13",
        from_hijri_date: "1443-11-12",
        // key: "selection", //not used
        count: 2,
        // numberOfNights: 2, //not used
        room_type_id: 2,
        room_view_id: 2,
        meal_id: 0,
        // total: 700, //not used
        oldTotal: 550,
        sub_total: null,
        vat: 75,
        total: 625, // sub_total + vat
        nights: [
          {
            night_id: 1,
            date: "2022-06-10",
            nightPrice: 500, //not used, but needed
            selling_price: null,
            count: 2,
            extra: [
              {
                extra_id: 1,
                night_id: 2,
                type: "Meals", //not used
                name: "Meal1", //not used
                price: 10, //not used
              },
              {
                extra_id: 2,
                night_id: 3,
                type: "Meals", //not used
                name: "Meal1", //not used
                price: 40, //not used
              },
            ],
          },
        ],
        guests: [
          {
            // id: 0, //not used
            name: "ahmed",
            confirmation_number: "123",
          },
          {
            // id: 1, //not used
            name: "Ali",
            confirmation_number: "456",
          },
        ],
      },
      // {
      //   id: 2,
      //   to_date: "2022-06-14",
      //   from_date: "2022-06-12",
      //   to_hijri_date: "1443-11-15",
      //   from_hijri_date: "1443-11-13",
      //   // key: "selection", //not used
      //   count: 2,
      //   // numberOfNights: 2, //not used
      //   room_type_id: 2,
      //   room_view_id: 2,
      //   meal_id: 0,
      //   // total: 700, //not used
      //   oldTotal: 500,
      //   sub_total: 880,
      //   vat: 132,
      //   total: 1012, // sub_total + vat
      //   nights: [
      //     {
      //       night_id: 1,
      //       date: "2022-06-12",
      //       nightPrice: 500, //not used, but needed
      //       selling_price: 800,
      //       count: 2,
      //       extra: [
      //         {
      //           extra_id: 1,
      //           night_id: 2,
      //           type: "Meals", //not used
      //           name: "Meal1", //not used
      //           price: 30, //not used
      //         },
      //       ],
      //     },{
      //       night_id: 1,
      //       date: "2022-06-13",
      //       nightPrice: 500, //not used, but needed
      //       selling_price: 400,
      //       count: 2,
      //       extra: [
      //         {
      //           extra_id: 1,
      //           night_id: 2,
      //           type: "Meals", //not used
      //           name: "Meal1", //not used
      //           price: 20, //not used
      //         }
      //       ],
      //     },
      //   ],
      //   guests: [
      //     {
      //       // id: 0, //not used
      //       name: "ahmed",
      //       confirmation_number: "123",
      //     },
      //     {
      //       // id: 1, //not used
      //       name: "Ali",
      //       confirmation_number: "456",
      //     },
      //   ],
      // }
    ],
    sub_total: 2420,
    vat: 363,
    total: 2783,
    status_id: 1,
    payment: 1000,
  },
  // {
  //   id: 1,
  //   agent: "Maha",
  //   client: 2,
  //   // guestName: "Eman",
  //   // numberofguests: "3",
  //   payment_method_id: 1,
  //   hotel: "Movenpick",
  //   nights: [
  //     {
  //       id: 1,
  //       endDate: "2022-06-12",
  //       startDate: "2022-06-10",
  //       endDateHijri: "1443-11-13",
  //       startDateHijri: "1443-11-11",
  //       key: "selection",
  //       numberOfRooms: 2,
  //       numberOfNights: 2,
  //       roomType: 2,
  //       roomView: 2,
  //       meal: 0,
  //       total: 700,
  //       newTotal: 880,
  //       vat: 132,
  //       extras: [
  //         {
  //           id: 1,
  //           date: "2022-06-10",
  //           nightPrice: 500,
  //           newNightPrice: null,
  //           extra: [
  //             {
  //               id: 1,
  //               type: "Meals",
  //               name: "Meal1",
  //               price: 10,
  //             },
  //             {
  //               id: 2,
  //               type: "Meals",
  //               name: "Meal2",
  //               price: 120,
  //             },
  //           ],
  //         },
  //         {
  //           id: 2,
  //           date: "2022-06-11",
  //           nightPrice: 200,
  //           newNightPrice: 250,
  //           extra: [
  //             {
  //               id: 2,
  //               type: "Meal",
  //               name: "Breakfast",
  //               price: 100,
  //             },
  //           ],
  //         },
  //       ],
  //       guests: [
  //         { id: 0, name: "ahmed", confirmationCode: "123" },
  //         { id: 1, name: "Ali", confirmationCode: "456" },
  //       ],
  //     },
  //     {
  //       id: 2,
  //       endDate: "2022-06-15",
  //       startDate: "2022-06-12",
  //       endDateHijri: "1443-11-14",
  //       startDateHijri: "1443-11-13",
  //       key: "selection",
  //       numberOfRooms: 4,
  //       numberOfNights: 1,
  //       roomType: 1,
  //       roomView: 1,
  //       meal: 1,
  //       total: 600,
  //       newTotal: 600,
  //       vat: 90,
  //       extras: [
  //         {
  //           id: 1,
  //           date: "2022-06-12",
  //           nightPrice: 600,
  //           newNightPrice: 500,
  //           extra: [
  //             {
  //               id: 5,
  //               type: "Furniture",
  //               name: "furniture1",
  //               price: 100,
  //             },
  //           ],
  //         },
  //         {
  //           id: 2,
  //           date: "2022-06-13",
  //           nightPrice: 500,
  //           newNightPrice: null,
  //           extra: [
  //             {
  //               id: 5,
  //               type: "Furniture",
  //               name: "furniture1",
  //               price: 100,
  //             },
  //           ],
  //         },
  //         {
  //           id: 3,
  //           date: "2022-06-14",
  //           nightPrice: 750,
  //           newNightPrice: 500,
  //           extra: [
  //             {
  //               id: 5,
  //               type: "Furniture",
  //               name: "furniture1",
  //               price: 100,
  //             },
  //           ],
  //         },
  //       ],
  //       guests:[
  //         {id:0, name:"Sami", confirmationCode:"678"},
  //         {id:1, name:"Eman", confirmationCode:"911"},
  //         {id:2, name:"Mohanmed", confirmationCode:"678"},
  //         {id:3, name:"Ibrahim ", confirmationCode:"911"},
  //       ]
  //     },
  //   ],
  //   reservationTotal: 2420,
  //   reservationVat: 363,
  //   status: "tentative",
  //   payment: 1000,
  // },

  // {
  //   id: 2,
  //   agent: "Eman",
  //   client: "Menna",
  //   guestName: "Maha",
  //   numberofguests: 4,
  //   hotel: "Jabal Omar Hyatt Regency",
  //   nights: [
  //     {
  //       id: 2,
  //       endDate: "2022-06-18",
  //       startDate: "2022-06-17",
  //       endDateHijri: "1443-06-01",
  //       startDateHijri: "1443-05-04",
  //       key: "selection",
  //       numberOfRooms: 2,
  //       numberOfNights: 3,
  //       roomType: "Double",
  //       roomView: "Kaaba view",
  //       meal: "Full board",
  //       total: 340,
  //       newTotal: 400,
  //       vat: 30,
  //       extras: [
  //         {
  //           id: 1,
  //           date: "2022-06-17",
  //           nightPrice: 200,
  //           newNightPrice: 250,
  //           extra: [
  //             {
  //               id: 3,
  //               type: "Furniture",
  //               name: "Sofa",
  //               price: 100,
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //   ],
  //   reservationTotal: 1500,
  //   reservationVat: 400,
  //   status: "tentative",
  //   payment: 900,
  // },
  // {
  //   id: 3,
  //   agent: "Menna",
  //   client: "Eman",
  //   guestName: "Maha",
  //   numberofguests: 4,
  //   hotel: "Makkah Clock Royal Tower",
  //   nights: [
  //     {
  //       id: 3,
  //       endDate: "2022-09-18",
  //       startDate: "2022-09-17",
  //       endDateHijri: "1443-07-01",
  //       startDateHijri: "1443-06-04",
  //       key: "selection",
  //       numberOfRooms: 2,
  //       numberOfNights: 3,
  //       roomType: "triple",
  //       roomView: "city view",
  //       meal: "Breakfast",
  //       total: 340,
  //       newTotal: 400,
  //       vat: 30,
  //       extras: [
  //         {
  //           id: 1,
  //           date: "2022-09-17",
  //           nightPrice: 200,
  //           newNightPrice: 250,
  //           extra: [
  //             {
  //               id: 4,
  //               type: "Furniture",
  //               name: "Bed",
  //               price: 100,
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //   ],
  //   reservationTotal: 1500,
  //   reservationVat: 400,
  //   status: "definite",
  //   payment: 1900,
  // },
  // {
  //   id: 4,
  //   agent: "Ahmed",
  //   client: "Menna",
  //   guestName: "Eman",
  //   numberofguests: 4,
  //   hotel: "Swissotel Makkah",
  //   nights: [
  //     {
  //       id: 1,
  //       endDate: "2022-06-8",
  //       startDate: "2022-06-20",
  //       endDateHijri: "1443-05-01",
  //       startDateHijri: "1443-03-04",
  //       key: "selection",
  //       numberOfRooms: 2,
  //       numberOfNights: 3,
  //       roomType: "single",
  //       roomView: "kaaba view",
  //       meal: "Half board",
  //       total: 340,
  //       newTotal: 400,
  //       vat: 30,
  //       extras: [
  //         {
  //           id: 1,
  //           date: "2022-06-17",
  //           nightPrice: 200,
  //           newNightPrice: 250,
  //           extra: [
  //             {
  //               id: 1,
  //               type: "Meal",
  //               name: "Breakfast",
  //               price: 100,
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //   ],
  //   reservationTotal: 1500,
  //   reservationVat: 400,
  //   status: "tentative",
  //   payment: 1200,
  // },
  // {
  //   id: 5,
  //   agent: "Maha",
  //   client: "Ahmed",
  //   guestName: "Eman",
  //   numberofguests: 4,
  //   hotel: "Al Kiswah Towers",
  //   nights: [
  //     {
  //       id: 1,
  //       endDate: "2022-10-17",
  //       startDate: "2022-10-01",
  //       endDateHijri: "1443-07-01",
  //       startDateHijri: "1443-06-04",
  //       key: "selection",
  //       numberOfRooms: 2,
  //       numberOfNights: 3,
  //       roomType: "tripple",
  //       roomView: "city view",
  //       meal: "Lunch",
  //       total: 340,
  //       newTotal: 400,
  //       vat: 30,
  //       extras: [
  //         {
  //           id: 1,
  //           date: "2022-10-01",
  //           nightPrice: 400,
  //           newNightPrice: 550,
  //           extra: [
  //             {
  //               id: 2,
  //               type: "Meal",
  //               name: "Breakfast",
  //               price: 100,
  //             },
  //           ],
  //         },
  //         {
  //           id: 2,
  //           date: "2022-10-17",
  //           nightPrice: 400,
  //           newNightPrice: 450,
  //           extra: [
  //             {
  //               id: 2,
  //               type: "Meal",
  //               name: "Breakfast",
  //               price: 100,
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //   ],
  //   reservationTotal: 2500,
  //   reservationVat: 600,
  //   status: "definite",
  //   payment: 3100,
  // },
];

export default reservation;
