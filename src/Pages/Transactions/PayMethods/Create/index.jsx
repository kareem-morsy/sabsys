// import DocumentMeta from "react-document-meta";
// import { useState, useEffect } from "react";
// import RequestContext from "../../Context/RequestContext";
// import { useContext } from "react";
// import "../../assets/css/create.css";
// import { useParams } from "react-router-dom";
// import { BsCheckCircle } from "react-icons/bs";

// function NewPayment() {
//   const [meta, setMeta] = useState({
//     title: "Create Meal",
//     description: "I am a description, and I can create multiple tags",
//     canonical: "http://domain.com/pageURl",
//     meta: {
//       charset: "utf-8",
//       name: {
//         keywords: "react,meta,document,html,tags",
//       },
//     },
//   });

//   const { Languages, addPayment, paymentMethods } = useContext(RequestContext);

//   const [title, setTitle] = useState("Create Payment Method");
//   const { paymentId } = useParams();
//   const [titles, setTitles] = useState([]);
//   const [payment, setPayment] = useState();

//   const handleTitles = async (code, e) => {
//     const names = titles?.map((t) => {
//       if (t.code === code) {
//         t.name = e.target.value;
//       }
//       return t;
//     });
//     setTitles(names);

//     if (/^[a-zA-Z ]+$/.test(e.target?.value)) {
//       setCountryError(false);
//       setShow(false);
//     } else {
//       setCountryError(true);
//       setShow(true);
//     }
//   };

//   const newPayment = (e) => {
//     e.preventDefault();

//     if (!show) {
//       if (countryId) {
//         editPayment(countryId, { languages: titles, isActive: isActive })
//           .then((res) => {
//             alert.success("Item Updated Successfully");
//             navigate("/payments");
//             Refresh();
//           })
//           .catch((err) => {
//             alert.error(err);
//           });
//       } else {
//         createPayment({ languages: titles, isActive: 1 })
//           .then((res) => {
//             alert.success("Item Added Successfully");
//             Refresh();
//           })
//           .catch((err) => {
//             alert.error(err);
//           });
//       }
//     }
//   };

//   useEffect(() => {
//     if (paymentId) {
//       getPaymentById(paymentId).then((data) => {
//         if (data !== undefined) {
//           console.log(data.data);
//           setPayment(data.data);
//           setTitle("Edit Payment Method");
//           setTitles(data.data.translations);
//           setIsActive(data.data.isActive);
//         }
//       });
//     } else {
//       setTitles(Languages?.map((lang) => ({ code: lang?.code, name: "" })));
//     }
//   }, [paymentId, Languages]);

//   return (
//     <div>
//       <div className="container">
//         <h1>{title}</h1>
//         <form onSubmit={(e) => newPayment(e)}>
//           <div className="form w-50 mx-auto">
//             {Languages.map((lang) => (
//               <>
//                 <div className="form-group row my-5">
//                   <label
//                     className="col-md-3 col-sm-12 col-form-label"
//                     htmlFor={`title${lang?.code}`}
//                   >
//                     Payment ({lang?.code})
//                   </label>
//                   <div className="col-md-9 col-sm-12">
//                     <input
//                       type="text"
//                       className="form-control col-md-6"
//                       required
//                       id={`title${lang?.code}`}
//                       name={`title-${lang?.code}`}
//                       onBlur={(e) => handleTitles(lang?.code, e)}
//                       defaultValue={
//                         payment?.translations?.find((l) => l.code === lang.code)
//                           ?.name
//                       }
//                     />
//                   </div>
//                 </div>
//               </>
//             ))}

//             {countryError && (
//               <span className="error">
//                 Please enter valid input No Special Charachters / No Numbers.
//               </span>
//             )}

//             <div className="d-flex justify-content-end">
//               <button className="btn bg-gold " type="submit" disabled={show}>
//                 Save
//               </button>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default NewPayment;
