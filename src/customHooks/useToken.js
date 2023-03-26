import React, { useState } from "react";
import { AlertToaster } from "../AlertToaster/AlertToaster";

export default function useToken() {
  const getToken = () => {
    const tokenString = sessionStorage.getItem("token");
    // console.log("step3", "tokenString", tokenString);
    const userToken = JSON.parse(tokenString);
    // console.log("userToken", userToken);
    return userToken;
  };

  const getUser = () => {
    let loggedUser = sessionStorage.getItem("user");
    // console.log("step3", "loggedUser", loggedUser);
    if (loggedUser) return JSON.parse(loggedUser);
  };
  const getPermissions = () => {
    const permissions = JSON.parse(sessionStorage.getItem("permissions"));
    // console.log("step3", "permissions", permissions);
    return permissions;
  };

  const [token, setToken] = useState(getToken());
  const [user, setUser] = useState(getUser());
  const [permissions, setPermissions] = useState(getPermissions());

  const saveToken = (userToken) => {
    sessionStorage.setItem("token", JSON.stringify(userToken.data.token));
    sessionStorage.setItem("user", JSON.stringify(userToken.data.user));
    sessionStorage.setItem(
      "permissions",
      JSON.stringify(userToken.data.permissions)
    );
    // console.log("Step2", "token", userToken.data.token);
    // console.log("Step2", "user", userToken.data.user);
    // console.log("Step2", "permissions", userToken.data.permissions);
    userToken.statusCode !== 200 && alert(userToken.message);
    userToken.statusCode !== 200 && <AlertToaster />;
    setUser(userToken.data.user);
    setToken(userToken.data.token);
    setPermissions(userToken.data.permissions);
  };

  const clearToken = () => {
    sessionStorage.setItem("token", null);
    setToken("");
  };
  const setCookie = (name, value, days) => {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  };
  const getCookie = (name) => {
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  };

  return {
    setToken: saveToken,
    removeToken: clearToken,
    setCookie,
    getCookie,
    token,
    user,
    permissions,
  };
}
