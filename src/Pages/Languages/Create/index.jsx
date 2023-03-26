// import DocumentMeta from "react-document-meta";
// import RequestContext from "../../Context/RequestContext";
// import { useContext, useEffect, useState } from "react";
// import "../../assets/css/create.css";
// import { useParams } from "react-router-dom";
// import { BsCheckCircle } from "react-icons/bs";
// import { getLangById, getLanguages } from "../../Services/Languages";

// function NewLanguage() {
//   const { addLang } = useContext(RequestContext);
//   const [alert, setAlert] = useState(false);
//   const { langId } = useParams();
//   // const { Languages } = useContext(RequestContext);
//   const [Languages, setLanguages] = useState([]);
//   const [ERROR, setError] = useState();
//   const [refreshState, setRefreshState] = useState(null);

//   const Refresh = (state) => {
//     setRefreshState(state);
//   };
//   useEffect(() => {
//     getLanguages()
//       .then((data) => {
//         if (data !== undefined) {
//           setLanguages(data.data);
//         }
//       })
//       .catch((error) => {
//         setError(error.message);
//       });
//   }, []);
//   const [title, setTitle] = useState("Create Language");
//   const [lang, setLang] = useState();

//   const newLang = (lang) => {
//     addLang(lang);

//     setAlert(true);
//     setTimeout(() => {
//       setAlert(false);
//     }, 2000);
//   };

//   useEffect(() => {
//     if (langId) {
//       setLang(Languages[langId - 1]);
//       setTitle("Edit Language");
//     }
//   }, [langId]);

//   return (
//     <div>
//       {/* <CreateComponent
//         title={title}
//         newItem={newLang}
//         editItem={lang?.language}
//       /> */}
//       {alert && (
//         <div
//           className="alert alert-success d-flex align-items-center"
//           role="alert"
//         >
//           <svg
//             className="bi flex-shrink-0 me-2"
//             width="24"
//             height="24"
//             role="img"
//             aria-label="Success:"
//           >
//             <BsCheckCircle className="pt-4" fontSize="20px" />
//           </svg>
//           <div>Item Added Successfully!</div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default NewLanguage;
