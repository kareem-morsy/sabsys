let getReservation = {
  // id: null, not used (required)

  // agent: null,
  user_id: null,

  // client: null,
  client_id:null,

  // hotel: null,
  hotel_id:null,

  payment_method_id:null,
  
  // status: tentative,
  status_id: null,

  // reservationTotal: null,
  sub_total: null,

  // reservationVat: null,
  vat: null,

  total: "sub_total + vat",

  // nights: [
    slots:[
      {
      // id: null, not used (required)

      // roomType: null,
      room_type_id:null,

      // roomView: null,
      room_view_id:null,

      // meal: null,
      meal_id: null,

      // startDate: null,
      from_date:null,
      
      // endDate: null,
      to_date: null,

      // startDateHijri: null,
      from_hijri_date: null,

      // endDateHijri: null,
      to_hijri_date: null,
      
      // total: null, not used, change to oldTotal (required)

      // newTotal: null,
      sub_total: null,

      // vat: null,
      vat: null,

      total: "sub_total + vat",
      
      // key: "selection", not used

      // numberOfRooms: null,
      count: null, 

      // numberOfNights: null, not used (required)

      //extras
      nights: [
        {
          // id: null, (required)
          night_id: "from inventory, based on: hotel, room type and view",

          // newNightPrice: null,
          selling_price: null,

          count: "number of rooms",

          // date: null,
          date: null,

          // nightPrice: null, not used main (required)

          extra: [
            {
              // id: null, (required)
              extra_id: null,

              night_id: "from inventory, based on: hotel, room type and view",

              // type: null, not used (required)
              // name: null, not used (required)
              // price: null not used (required)
            }
          ]
        }
      ],
      guests: [
        {
          // id: null, not used (required)
          name: null,

          // confirmationCode: null,
          confirmation_number: null
        }
      ]
    }
  ]
}