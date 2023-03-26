import { useRef, useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import img from "../../assets/profile.png";
import RequestContext from "../../Context/RequestContext";
import { ImEye, ImEyeBlocked } from "react-icons/im";
import { getUserById, getUsers } from "../../Services/Users";
import fetcher from "../../Services/fetcher";

const Setting = () => {
  // const { users } = useContext(RequestContext);
  // const [Users, setUsers] = useState([]);
  // const [Reservations, setReservations] = useState([]);
  const [refreshState, setRefreshState] = useState(null);

  const Refresh = (state) => {
    setRefreshState(state);
  };
  const { userId } = useParams();

  const [error, setError] = useState(false);
  const [user, setUser] = useState();

  const passRef = useRef();
  const newPassRef = useRef();

  const [showPass, setShowPass] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (passRef.current?.value === newPassRef.current?.value) {
      setError(true);
    } else {
      setError(false);
    }
  };

  const showPassHandler = () => {
    setShowPass(!showPass);
  };
  useEffect(() => {
    if (userId) {
      fetcher(`users/${userId}`).then((data) => {
        if (data !== undefined) {
          setUser(data.data);
        }
      });
    }
  }, [userId]);

  return (
    <div className="container">
      <h1>Settings</h1>
      <div className="login mx-auto my-5 py-5">
        <div className="text-center">
          <img src={img} alt="image" className="img-fluid w-25 mb-5" />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control my-2"
              id="email"
              aria-describedby="email"
              defaultValue={user?.email}
              name="email"
              disabled
            />
          </div>
          <div className="form-group my-4">
            <label htmlFor="pass">Old Password</label>
            <div className="input-group mb-2 mr-sm-2">
              <div className="input-group-prepend">
                <div className="input-group-text mt-2">
                  <div onClick={showPassHandler}>
                    {" "}
                    {showPass ? <ImEye /> : <ImEyeBlocked size="18px" />}
                  </div>
                </div>
              </div>
              <input
                type={showPass ? "text" : "password"}
                className="form-control my-2"
                id="pass"
                placeholder="Password"
                name="password"
                required
                ref={passRef}
              />
            </div>
          </div>

          <div className="form-group my-4">
            <label htmlFor="newpass">Create Password</label>
            <div className="input-group mb-2 mr-sm-2">
              <div className="input-group-prepend">
                <div className="input-group-text mt-2">
                  <div onClick={showPassHandler}>
                    {" "}
                    {showPass ? <ImEye /> : <ImEyeBlocked size="18px" />}
                  </div>
                </div>
              </div>
              <input
                type="password"
                className="form-control my-2"
                id="newpass"
                placeholder="Create Password"
                name="newPassword"
                required
                ref={newPassRef}
              />
              {error && (
                <div className="error">
                  New Password must be different from old password
                </div>
              )}
            </div>
          </div>

          <div>
            <button type="submit" className="btn bg-gold w-100">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Setting;
