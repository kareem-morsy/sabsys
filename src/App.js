import "./App.css";
import React, { useState, useEffect } from "react";
import LoginForm from "./Pages/Login/LoginForm";
import useToken from "./customHooks/useToken";
import SideBar from "./Components/Layout/SideBar";
import Main from "./Components/MainComponent/Main";
import { transitions, positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import FloatingBtn from "./Components/FloatingBtn/FloatingBtn";
// import useWebSocket from 'react-use-websocket';
function App() {
  // const url = 'wss://echo.websocket.events';
  // const SOCKET_URL_TWO = 'wss://demos.kaazing.com/echo';
  // const READY_STATE_OPEN = 1;

  // const generateAsyncUrlGetter =
  //   (url, timeout = 2000) =>
  //     () => {
  //       return new Promise((resolve) => {
  //         setTimeout(() => {
  //           resolve(url);
  //         }, timeout);
  //       });
  //     };

  // const [currentSocketUrl, setCurrentSocketUrl] = useState(null);
  // const [messageHistory, setMessageHistory] = useState([]);
  // const [inputtedMessage, setInputtedMessage] = useState();

  // const { sendMessage, lastMessage, readyState, getWebSocket } = useWebSocket(
  //   currentSocketUrl,
  //   {
  //     share: true,
  //     shouldReconnect: () => true,
  //   }
  // );
  // const sendNotification = () => {
  //   sendMessage(inputtedMessage)
  // }

  // useEffect(() => {
  //   setCurrentSocketUrl(generateAsyncUrlGetter(url))
  // }, []);

  // useEffect(() => {
  //   lastMessage && setMessageHistory((prev) => prev.concat(lastMessage.data));
  // }, [lastMessage]);

  // const readyStateString = {
  //   0: 'CONNECTING',
  //   // 1: 'OPEN',
  //   // 2: 'CLOSING',
  //   // 3: 'CLOSED',
  // }[readyState];



  const options = {
    timeout: 5000,
    // offset: '30px',
    position: positions.TOP_RIGHT,
    transition: transitions.SCALE,
    containerStyle: {
      color: "red",
      zIndex: 9999999999,
    },
  };
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(!show);
  const {
    user,
    token,
    permissions,
    setToken,
    removeToken,
    setCookie,
    getCookie,
  } = useToken();
  if (!token) {
    return (
      <LoginForm
        setToken={setToken}
        setCookie={setCookie}
        getCookie={getCookie}
      />
    );
  }
  return (
    <div className="App">
      <Provider template={AlertTemplate} {...options}>
        <SideBar handleShow={handleShow} show={show} />
        <Main
          // generateAsyncUrlGetter={generateAsyncUrlGetter}
          // sendNotification={sendNotification}
          // currentSocketUrl={currentSocketUrl}
          // setCurrentSocketUrl={setCurrentSocketUrl}
          // messageHistory={messageHistory}
          // setMessageHistory={setMessageHistory}
          // sendMessage={sendMessage}
          // lastMessage={lastMessage}
          // readyState={readyState}

          handleShow={handleShow}
          show={show}
          user={user}
          handleLogout={removeToken}
          token={token}
          permissions={permissions}
        />
      </Provider>

      <FloatingBtn />
    </div>
  );
}
export default App;
