import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import AlertTemplate from 'react-alert-template-basic'
import { transitions, positions, Provider  as AlertProvider } from 'react-alert'

import { BrowserRouter } from "react-router-dom";
// import { RequestContextProvider } from "./Context/RequestContext";
import { ReservationContextProvider } from "./Context/ReservationContext";
// import { ProSidebarProvider } from "react-pro-sidebar";

//Login Options
const options = {
  timeout: 5000,
  offset: '0px',
  position: positions.TOP_RIGHT,
  transition: transitions.SCALE,
  containerStyle: {
    marginTop : '5px',
    color: '#fff'
  }
}

ReactDOM.render(
  <ReservationContextProvider>
    <BrowserRouter>
    <AlertProvider template={AlertTemplate} {...options}>
      <App />
    </AlertProvider>
      
    </BrowserRouter>
  </ReservationContextProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
