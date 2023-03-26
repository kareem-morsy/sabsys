import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import fetcher from "../../../Services/fetcher";
import useSimplePost from "../../../customHooks/useSimplePost";
import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket";

function NewBank({
  // generateAsyncUrlGetter,sendNotification,
  // currentSocketUrl,setCurrentSocketUrl,
  // messageHistory,setMessageHistory,
  // sendMessage,
  // lastMessage,readyState
}) {
  const { formPost } = useSimplePost();
  const [languages, setLanguages] = useState();
  // const url = 'wss://echo.websocket.events';
  // const SOCKET_URL_TWO = 'wss://demos.kaazing.com/echo';
    // const READY_STATE_OPEN = 1;
  
    // const generateAsyncUrlGetter =
    // (url, timeout = 2000) =>
    // () => {
    //   return new Promise((resolve) => {
    //     setTimeout(() => {
    //       resolve(url);
    //     }, timeout);
    //   });
    // };
  
    // const [currentSocketUrl, setCurrentSocketUrl] = useState(null);
    // const [messageHistory, setMessageHistory] = useState([]);
    // const [inputtedMessage, setInputtedMessage] = useState("");
   
    // const { sendMessage, lastMessage, readyState, getWebSocket } = useWebSocket(
    //   currentSocketUrl,
    //   {
    //     share: true,
    //     shouldReconnect: () => true,
    //   }
    // );
    // const sendNotification =()=>{
    //   sendMessage(inputtedMessage)
    // }
  
    // useEffect(() => {
    //   setCurrentSocketUrl(generateAsyncUrlGetter(url))
    // }, []);
  
    // useEffect(() => {
    //   lastMessage && setMessageHistory((prev) => prev.concat(lastMessage.data));
    // }, [lastMessage]);
    // console.log("messageHistory" ,messageHistory);
  
    // const readyStateString = {
    //   0: 'CONNECTING',
    //   // 1: 'OPEN',
    //   // 2: 'CLOSING',
    //   // 3: 'CLOSED',
    // }[readyState];
  useEffect(() => {
    fetcher("languages")
      .then((data) => {
        if (data !== undefined) {
          setLanguages(data.data);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("weqwewq", data);
    const newData = Object.values(data);
    const newCode = Object.keys(data);
    console.log("newCode", newCode);

    const obj = [];
    for (let i = 0; i < newData.length; i++) {
      if (newCode[i] !== "isActive") {
        obj.push({
          code: newCode[i],
          name: newData[i],
        });
      }
    }
    const PostObj = {
      languages: obj,
      isActive: data?.isActive,
    };
    console.log("PostObj", PostObj);

    // formPost(null, "banks", PostObj);
    console.log("datafff",data);
    sendMessage(data.ar);
    
  };
  return (
    <div>
         
      <div className="container">
        <h1>Create Bank</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form w-50 mx-auto">
            {languages
              ?.filter((lang) => lang.isActive === true)
              ?.map((lang) => (
                <div className="form-group row mt-5 mb-3">
                  <label
                    className="col-md-3 col-sm-12 col-form-label"
                    htmlFor={`title${lang?.code}`}
                  >
                    Name ({lang?.name})
                  </label>
                  <div className="col-md-9 col-sm-12">
                    {/* register your input into the hook by invoking the "register" function */}
                    <input
                      className="form-control col-md-6"
                      id={`title${lang?.name}`}
                      // defaultValue="test"
                      {...register(`${lang?.code}`, {
                        required: true,
                      })}
                      placeholder={`${lang?.name}`}
                    />
                    {/* errors will return when field validation fails  */}
                    {errors[`${lang?.name}`] && (
                      <span>This field is required</span>
                    )}
                  </div>
                </div>
              ))}
            <div className="form-group row mt-5 mb-3">
              <div className="col-md-9">
                <label
                  className="col-md-3 col-sm-12 col-form-label"
                  htmlFor="active"
                >
                  Active:
                </label>
                <input
                  id="active"
                  className="col-md-6"
                  type="checkbox"
                  {...register(`isActive`, {
                    required: false,
                  })}
                />
              </div>
            </div>

            <input type="submit" className="btn bg-gold w-100" />
          </div>
        </form>
        <br />
      {/* notifications: {messageHistory.length} */}
      <br />
      {/* MessageHistory: {messageHistory !== "echo.websocket.events sponsored by Lob.com" && console.log("notification")
      //  messageHistory.join(', ') :
     
        } */}

        {/* { messageHistory.filter(( i,k )=> <div key={k}>{i !== "echo.websocket.events sponsored by Lob.com"}</div>)} */}
      <br/>
      </div>
    </div>
  );
}

export default NewBank;
