// import RequestContext from "../../../Context/RequestContext";
// import { getPermissions } from "../../../Services/Permissions";
// import FetchDataHook from "../../../customHooks/fetchDataHook";
import { useState, useRef, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Select from "react-select";
import { getUserById, createUser, editUser } from "../../../Services/Users";
import { ImEye, ImEyeBlocked } from "react-icons/im";
import { useAlert } from "react-alert";
import { getRoleById, getRoles } from "../../../Services/Roles";
import useToken from "../../../customHooks/useToken";
import fetcher from "../../../Services/fetcher";
const CreateUser = (props) => {
  const { id } = useParams();
  // const { Roles, Permissions, Refresh } = useContext(RequestContext);
  const [Roles, setRoles] = useState([]);
  const [Permissions, setAllPermissions] = useState([]);
  const [rolePermissions, setRolePermissions] = useState([]);
  const [ERROR, setError] = useState();
  const [refreshState, setRefreshState] = useState(null);
  const { token } = useToken();

  useEffect(() => {
    fetcher(`roles`)
      .then((data) => {
        if (data !== undefined) {
          setRoles(data.data);
          console.log("roles", data.data);
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  }, [refreshState]);
  useEffect(() => {
    fetcher(`permissions`)
      .then((data) => {
        if (data !== undefined) {
          setAllPermissions(data.data);
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  }, [refreshState]);
  const [title, setTitle] = useState("Create User Profile");
  const [user, setUser] = useState();
  const [permissions, setPermissions] = useState([]);
  const navigate = useNavigate();
  const nameRef = useRef();
  const phoneRef = useRef();
  const passRef = useRef();
  const confirmRef = useRef();
  const emailRef = useRef();
  const [role, setRole] = useState(null);

  const [show, setShow, setSetShow] = useState(true);
  const alert = useAlert();

  const [nameError, setNameError] = useState(null);
  const [phoneError, setPhoneError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [confirmError, setConfirmError] = useState(null);
  const [roleError, setRoleError] = useState(null);

  const [showPass, setShowPass] = useState(false);

  const showPassHandler = () => {
    setShowPass(!showPass);
  };

  const handlePermissions = (event, id) => {
    console.log(event.target.id, id);
    let updatedList = [...permissions];
    if (event.target.checked) {
      updatedList = [...permissions, id];
    } else {
      updatedList.splice(permissions.indexOf(id), 1);
    }
    setPermissions(updatedList);
    console.log(permissions.indexOf(id));
  };

  useEffect(() => {
    if (id) {
      getUserById(id, token).then((data) => {
        if (data !== undefined) {
          setUser(data.data);
          setTitle("Edit User Profile");
          setPermissions(data.data.permissions?.map((p) => p.id));
          setRole({
            value: data.data.roles[0].id,
            label: data.data.roles[0].name,
          });
          setNameError(false);
          setEmailError(false);
          setPhoneError(false);
          setPasswordError(false);
          setConfirmError(false);
          setRoleError(false);
        }
      });
    }
    // setPermissions(Roles?.find(r => r.id === role?.value)?.permissions?.map(p => p.id))
  }, [id]);

  useEffect(() => {
    if (
      nameError === false &&
      phoneError === false &&
      emailError === false &&
      passwordError === false &&
      confirmError === false &&
      roleError === false
    ) {
      setShow(false);
    } else {
      setShow(true);
    }
  }, [
    nameError,
    phoneError,
    emailError,
    passwordError,
    confirmError,
    roleError,
  ]);

  let UserObj =
    passRef.current?.value && confirmRef.current?.value
      ? {
          name: nameRef.current?.value,
          phone: phoneRef.current?.value,
          email: emailRef.current?.value,
          password: passRef.current?.value,
          password_confirmation: confirmRef.current?.value,
          roles: [role?.value],
          permissions: permissions,
        }
      : {
          name: nameRef.current?.value,
          phone: phoneRef.current?.value,
          email: emailRef.current?.value,
          roles: [role?.value],
          permissions: permissions,
        };

  const handleSelect = (option) => {
    setRole(option);
    getRoleById(`${option.value}`, token).then((response) => {
      console.log("perById", response.data);
      setRolePermissions(response.data.permissions);
    });
    // setPermissions(
    //   Roles?.find((role) => role.id === option?.value)?.permissions?.map(
    //     (p) => p.id
    //   )
    // );
    setRoleError(false);
  };

  const Reset = () => {
    setUser({});
    nameRef.current.value = "";
    phoneRef.current.value = "";
    emailRef.current.value = "";
    passRef.current.value = "";
    confirmRef.current.value = "";
    setRole({});
    setPermissions([]);
    setShow(true);
  };

  const createProfile = (e) => {
    console.log(UserObj);
    e.preventDefault();

    if (!show) {
      if (id) {
        editUser(id, UserObj, token)
          .then((res) => {
            alert.success("Item Updated Successfully");
            navigate("/users");
            setRefreshState(!refreshState);
          })
          .catch((error) => {
            setShow(true);
            error?.response?.data?.message?.map((err) => alert.error(err));
          });
      } else {
        createUser(UserObj, token)
          .then((res) => {
            alert.success("Item Added Successfully");
            navigate("/users");
            Reset();
            setShow(true);
            setRefreshState(!refreshState);
          })
          .catch((error) => {
            setShow(true);
            error?.response?.data?.message?.map((err) => alert.error(err));
          });
      }
    } else {
      alert.error("Please enter a valid Data");
    }
  };

  return (
    <div className="container">
      <h1>{title}</h1>
      <form onSubmit={(e) => createProfile(e)}>
        <div className="row ">
          {/* <div className="mx-auto w-25 text-center">
                        <img src={person?.logo} className="profile" alt="profile" />
                        <input ref={registerRef} type="file" className="form-control my-2" defaultValue={person?.logo} placeholder={person?.logo}/>
                    </div> */}
          <div className="col-md-12 my-5 px-4">
            <div className="form-group row">
              <label
                htmlFor="name"
                className="col-md-1 col-sm-12 col-form-label"
              >
                Name
              </label>
              <div className="col-md-5 col-sm-12">
                <input
                  ref={nameRef}
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Name"
                  required
                  defaultValue={user?.name}
                  onBlur={(e) =>
                    /^[a-zA-Z,\u0621-\u064A\u0660-\u0669 ]+$/.test(
                      e.target.value
                    )
                      ? setNameError(false)
                      : setNameError(true)
                  }
                />
                {nameError && (
                  <span className="error">
                    Please enter valid Input No Special Charachters / No Numbers
                  </span>
                )}
              </div>

              <label
                htmlFor="phone"
                className="col-md-1 col-sm-6 col-form-label"
              >
                Phone
              </label>
              <div className="col-md-5 col-sm-12">
                <input
                  ref={phoneRef}
                  type="text"
                  className="form-control"
                  id="phone"
                  placeholder="Phone"
                  required
                  defaultValue={user?.phone}
                  onBlur={(e) =>
                    /^01[0-2,5]{1}[0-9]{8}$/.test(e.target.value)
                      ? setPhoneError(false)
                      : setPhoneError(true)
                  }
                />
                {phoneError && (
                  <span className="error">Phone Must Be A Valid Number</span>
                )}
              </div>
            </div>
            <div className="form-group row my-3">
              <label
                htmlFor="email"
                className="col-md-1 col-sm-12 col-form-label"
              >
                Email
              </label>
              <div className="col-md-5 col-sm-12">
                <input
                  ref={emailRef}
                  type="email"
                  required
                  className="form-control"
                  id="email"
                  placeholder="Email"
                  defaultValue={user?.email}
                  onBlur={(e) =>
                    /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(e.target.value)
                      ? setEmailError(false)
                      : setEmailError(true)
                  }
                />
                {emailError && (
                  <span className="error">
                    Email Must be valid Ex: test@test.com
                  </span>
                )}
              </div>
              <label
                htmlFor="email"
                className="col-md-1 col-sm-12 col-form-label"
              >
                Role
              </label>
              <div className="col-md-5 col-sm-12">
                <Select
                  value={{ value: role?.value, label: role?.label }}
                  isMulti={false}
                  isClearable={false}
                  options={Roles?.map((role) => ({
                    value: role.id,
                    label: role.name,
                  }))}
                  classNamePrefix="Select"
                  onChange={(e) => handleSelect(e)}
                />
                {roleError && <span className="error">Please Select Role</span>}
              </div>
            </div>
            <div className="col-md-12 mb-5 ">
              <div className="form-group row">
                <label
                  htmlFor="name"
                  className="col-md-2 col-sm-12 col-form-label"
                >
                  Password
                </label>
                <div className="col-md-4 col-sm-12">
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
                      //   id="password"
                      name="password"
                      //   required
                      placeholder="Password"
                      ref={passRef}
                      onBlur={(e) =>
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/.test(
                          e.target.value
                        )
                          ? setPasswordError(false)
                          : setPasswordError(true)
                      }
                    />
                  </div>
                  {passwordError && (
                    <span className="error">
                      Password must be at least 8 characters,
                      <br /> at least one uppercase letter, <br /> one lowercase
                      letter, <br /> one number and one special character
                    </span>
                  )}
                </div>

                <label
                  htmlFor="confirm"
                  className="col-md-2 col-sm-6 col-form-label"
                >
                  Confirm Password
                </label>

                <div className="col-md-4 col-sm-12">
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
                      //   id="confirm"
                      name="confirm"
                      //   required
                      placeholder="Confirm Password"
                      ref={confirmRef}
                      onBlur={(e) =>
                        e.target.value === passRef.current?.value
                          ? setConfirmError(false)
                          : setConfirmError(true)
                      }
                    />
                  </div>
                  {confirmError && (
                    <span className="error mb-4">
                      Password and Confirm Password Must Be Same
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="table">
          <h3 className="head mb-4">Permissions</h3>
          <div className=" px-5 d-flex flex-wrap">
            {Permissions.map((per) => (
              <div key={per.type} className="col-md-6">
                <h5 className="head">{per.type} : </h5>
                <div className="mb-5 px-3">
                  {per.permissions?.map((p) => (
                    <div className="mx-3 px-5" key={p.id}>
                      <input
                        className="meals"
                        type="checkbox"
                        id={p.id}
                        value={p.id}
                        checked={rolePermissions?.find(
                          (per) => per.id === p.id
                        )}
                        onChange={(e) => handlePermissions(e, p.id)}
                      />
                      <label htmlFor={p.id}>{p.display_name}</label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="d-flex my-5">
          <button
            className="btn bg-gold save w-50"
            type="submit"
            disabled={show}
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateUser;
