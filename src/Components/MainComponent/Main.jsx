import "./Main.css";
import Nav from "../../Components/Layout/Navbar";

import AppRoutes from "../../Routes/AppRoutes";
const Main = ({ permissions, token, show, handleShow, user, handleLogout 
  ,generateAsyncUrlGetter,sendNotification,
  currentSocketUrl,setCurrentSocketUrl,
  messageHistory,setMessageHistory,sendMessage,
  lastMessage,readyState}) => {
  return (
    <div className={`main pb-3 ${show ? "mainCollapsed" : ""}`}>
      <Nav
      messageHistory={messageHistory}
        show={show}
        handleShow={handleShow}
        user={user}
        handleLogout={handleLogout}
      />
      <AppRoutes token={token} permissions={permissions}
       generateAsyncUrlGetter={generateAsyncUrlGetter}
       sendNotification={sendNotification}
       currentSocketUrl={currentSocketUrl}
       setCurrentSocketUrl={setCurrentSocketUrl}
       messageHistory={messageHistory}
       setMessageHistory={setMessageHistory}
       sendMessage={sendMessage}
       lastMessage={lastMessage}
       readyState={readyState}
       />
    </div>
  );
};
export default Main;
