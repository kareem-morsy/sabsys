import { useState, useEffect } from "react";
import Select from "react-select";
import { ImEye, ImEyeBlocked } from "react-icons/im";
import fetcher from "../../../Services/fetcher";
import { useForm, Controller } from "react-hook-form";
import useSimplePost from "../../../customHooks/useSimplePost";
import useCheckListHandler from "../../../customHooks/useCheckListHandler";

const CreateUser = () => {
  const { checkList, handleCheckList, setCheckList } = useCheckListHandler();
  const { formPost } = useSimplePost();
  const [roles, setRoles] = useState([]);
  const [Permissions, setPermissions] = useState([]);
  const [title, setTitle] = useState("Create User Profile");
  const [role, setRole] = useState(null);
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    fetcher(`roles`)
      .then((data) => {
        if (data !== undefined) {
          setRoles(data.data);
          console.log("roles", data.data);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });

    fetcher(`permissions`)
      .then((data) => {
        if (data !== undefined) {
          setPermissions(data.data);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });

    setValue("email", "");
    setValue("password", "");
  }, []);

  useEffect(() => {
    fetcher(`roles/${role}`).then((x) =>
      setCheckList(x.data.permissions.map((p) => ({ id: p.id, name: p.name })))
    );
  }, [role]);

  const showPassHandler = () => {
    setShowPass(!showPass);
  };

  const onSubmit = (data) => {
    console.log("data", data);
    data.permissions = checkList?.map((p) => p.id);
    data.roles = [data.roles];

    if (data.password == data.password_confirmation) {
      setError(false);
      formPost(null, "users", data);
    } else {
      setError(true);
    }
  };

  return (
    <div className="container">
      <h1>{title}</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
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
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Name"
                  {...register("name", {
                    required: "Name is Required.",
                  })}
                />
                {errors?.name && (
                  <span className="error">Name is required</span>
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
                  type="number"
                  className="form-control"
                  id="phone"
                  placeholder="Phone"
                  {...register("phone", {
                    required: "Phone is Required.",
                  })}
                />
                {/* {errors?.phone && (
                  <span className="error">Phone Must Be A Valid Number</span>
                )} */}
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
                  type="email"
                  required
                  className="form-control"
                  id="email"
                  placeholder="Email"
                  {...register("email", {
                    required: "Email is Required.",
                    pattern: {
                      value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i,
                      message: "Please enter valid input.",
                    },
                  })}
                />
                {errors?.email && (
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
                <Controller
                  control={control}
                  name="roles"
                  {...register(`roles`, {
                    required: "Role is Required.",
                  })}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      placeholder="Select Role"
                      isMulti={false}
                      isClearable={true}
                      options={roles?.map((role) => ({
                        value: role.id,
                        label: role.name,
                      }))}
                      classNamePrefix="Select"
                      required
                      onChange={(e) => {
                        onChange(e.value);
                        setRole(e.value);
                      }}
                    />
                  )}
                />
                {/* {roleError && <span className="error">Please Select Role</span>} */}
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
                      name="password"
                      placeholder="Password"
                      {...register("password", {
                        required: "Password is Required.",
                      })}
                    />
                  </div>
                  {errors?.password && (
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
                      name="confirm"
                      placeholder="Confirm Password"
                      {...register("password_confirmation", {
                        required: "Password Confirmation is Required.",
                      })}
                    />
                  </div>
                  {error && (
                    <span className="error mb-4">
                      Password and Confirm Password Must Be Same
                    </span>
                  )}
                </div>
                <div className="col-md-3 ">
                  <label
                    className="col-md-3 col-sm-12 col-form-label"
                    htmlFor="active"
                  >
                    Active:
                  </label>
                  <input
                    id="active"
                    className="col-md-1"
                    type="checkbox"
                    defaultChecked={true}
                    {...register(`isActive`, {
                      required: false,
                    })}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="table">
          <h3 className="head mb-4">Permissions</h3>
          <div className=" px-5 d-flex flex-wrap">
            {Permissions?.map((per) => (
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
                        checked={checkList?.find((per) => per.id === p.id)}
                        onChange={(e) =>
                          handleCheckList(e, p.id, { id: p.id, name: p.name })
                        }
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
            // disabled={show}
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateUser;
