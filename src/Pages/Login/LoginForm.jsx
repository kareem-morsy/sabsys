import { useState, useEffect } from "react";
import "./Login.css";
import { userLogin } from "../../Services/Login";
import logo from "../../logo.png";
// React-hook-form
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAlert } from "react-alert";

import * as yup from "yup";
// React-hook-form
// React-toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginFetcher } from "../../Services/fetcher";
// React-toastify

const LoginForm = ({ setToken, setCookie, getCookie }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const alert = useAlert();

  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const sendData = async (data) => {
    const loginData = await loginFetcher(`login`, data);
    if (loginData.message == "success") {
      setToken(loginData);
    } else {
      alert.show("Wrong Credentials");
    }
    // setToken(loginData);
  };
  const handleRemember = () => {
    setCookie("email", email, 30);
    setCookie("password", password, 30);
  };

  useEffect(async () => {
    await setEmail(getCookie("email") ? getCookie("email") : "");
    await setPassword(getCookie("password") ? getCookie("password") : "");
  }, []);

  return (
    <div className="login-form">
      <div className="login mx-2 my-3 py-3">
        <div className="text-center">
          <img src={logo} alt="image" className="img-fluid w-25" />
          <h1 className="mt-3">Login</h1>
        </div>
        <form onSubmit={handleSubmit(sendData)}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Your Email Is ...."
              {...register("email")}
              className="form-control"
            />
          </div>
          <div className="form-group my-4">
            <label htmlFor="pass">Password</label>
            <input
              type="password"
              placeholder="Your Password Is ...."
              {...register("password")}
              className="form-control"
            />
          </div>
          <div className="form-group form-check mb-2">
            <input
              type="checkbox"
              className="form-check-input"
              id="rememberme"
              onClick={handleRemember}
            />
            <label className="form-check-label" htmlFor="rememberme">
              Remember Me
            </label>
          </div>

          <div>
            <button type="submit" className="btn bg-gold w-100">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
