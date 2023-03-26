
const paymentDetails = [

    {id:1, reservationId:1, client:'Menna', agent:'Maha', guestName:'Eman', price:1900, status: 'tentitive', paymentList:[{paymentMethod:'cash', paidAmount:1000, date:'Fri Oct 17 2022 00:00:00 GMT+0200 (Eastern European Standard Time'}]},

    {id:2, reservationId:2, client:'Menna', agent:'Eman', guestName:'Maha', price:1900, status: 'tentitive', paymentList:[{paymentMethod:'credit', paidAmount:900, date:'Fri Oct 17 2022 00:00:00 GMT+0200 (Eastern European Standard Time'}]},

    {id:3, reservationId:4, client:'Menna', agent:'Ahmed', guestName:'Eman', price:1900, status: 'tentitive', paymentList:[{paymentMethod:'credit', paidAmount:1200, date:'Fri Oct 17 2022 00:00:00 GMT+0200 (Eastern European Standard Time'}]},

    {id:4, reservationId:5, client:'Ahmed', agent:'Maha', guestName:'Eman', price:3100, status: 'definite', paymentList:[{paymentMethod:'credit', paidAmount:2000, date:'Fri Oct 17 2022 00:00:00 GMT+0200 (Eastern European Standard Time'},{paymentMethod:'cash', paidAmount:1100, date:'Sat Oct 18 2022 00:00:00 GMT+0200 (Eastern European Standard Time'}]},

    {id:5, reservationId:3, client:'Eman', agent:'Menna', guestName:'Maha', price:1900, status: 'definite', paymentList:[{paymentMethod:'credit', paidAmount:1900, date:'Fri Oct 17 2022 00:00:00 GMT+0200 (Eastern European Standard Time'}]},

]

export default paymentDetails;