// import {useRef, useState, useContext} from 'react'
// import './Login.css'
// import img from '../../assets/profile.png'
// import RequestContext from '../../Context/RequestContext';
// // import { login } from "../../Services/Login";

// const Login = (props) =>{

//     const { users } = useContext(RequestContext);

//     const [errorMessages, setErrorMessages] = useState({});

//     const [error, setError] = useState('')

//     // const errors = {
//     //     email: "invalid email",
//     //     pass: "invalid password"
//     // };

//     const emailRef = useRef()
//     const passRef = useRef()

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         // const userData = users.find((user) => user.email === emailRef.current?.value)

//         login({
//             email: emailRef.current?.value,
//             password: passRef.current?.value
//         })
//         .then((data) => {
//             console.log(data)
//             props.handleLogging(data.data.user);
//         })
//         .catch((err) => {
//             console.log(err)
//             setError(err)
//         })

//         // if(userData){
//         //     console.log(userData);
//         //     if (userData.password !== passRef.current?.value) {
//         //         setErrorMessages({ name: "pass", message: errors.pass });
//         //     }
//         //     else {
//         //         props.handleLogging(userData);
//         //     }
//         // }
//         // else {
//         //         setErrorMessages({ name: "email", message: errors.email });

//         // }
//     };

//     const renderErrorMessage = (name) =>
//     name === errorMessages.name && (
//         <div className="error">{errorMessages.message}</div>
//     );

//     return (
//         <div className="login mx-auto my-5 py-5">
//             <div className="text-center">
//                 <img src={img} alt="image" className="img-fluid w-25"/>
//                 <h1>Login</h1>
//             </div>
//             <form onSubmit={handleSubmit}>
//                 <div className="form-group">
//                     <label htmlFor="email">Email</label>
//                     <input type="email" className="form-control my-2" id="email" aria-describedby="email" placeholder="Your email" name="email" required ref={emailRef}/>
//                     {renderErrorMessage("email")}
//                     {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
//                 </div>
//                 <div className="form-group my-4">
//                     <label for="pass">Password</label>
//                     <input type="password" className="form-control my-2" id="pass" placeholder="Password" name="password" required ref={passRef}/>
//                     {/* {error} */}
//                 </div>

//                 <div>
//                     <button type="submit" className="btn bg-gold w-100">Login</button>
//                 </div>
//             </form>
//         </div>

//     )
// }

// export default Login
