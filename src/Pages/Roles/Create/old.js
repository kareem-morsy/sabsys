import { useState, useEffect, useRef } from "react";
import "../../../assets/css/create.css";
import { useParams, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import useSimplePost from "../../../customHooks/useSimplePost";
import useCheckListHandler from "../../../customHooks/useCheckListHandler";
import useToken from "../../../customHooks/useToken";
import fetcher from "../../../Services/fetcher";

function NewDepartment() {
  const { data, title, formPost, getData } = useSimplePost();
  const [Permissions, setPermissions] = useState([]);

  const Refresh = (state) => {
    setRefreshState(state);
  };
  const { token } = useToken();
  useEffect(() => {
    fetcher(`permissions`)
      .then((data) => {
        if (data !== undefined) {
          setPermissions(data.data);
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);
  const { checkList, handleCheckList, setInitialValues } =
    useCheckListHandler();
  const alert = useAlert();
  const { roleId } = useParams();
  const [role, setRole] = useState();
  // const [permissions, setPermissions] = useState([]);
  const roleRef = useRef();
  const [roleError, setRoleError] = useState(null);
  const [permissionsError, setPermissionsError] = useState(null);
  const [show, setShow] = useState(true);

  let RoleObj = {
    name: roleRef.current?.value,
    display_name: roleRef.current?.value,
    description: roleRef.current?.value,
    permissions: checkList,
  };

  const newRole = (e) => {
    e.preventDefault();

    if (!show) {
      if (roleId) {
        if (token) {
          formPost(roleId, "roles", RoleObj, token);
        }
      } else {
        if (token) {
          formPost(null, "roles", RoleObj, token);
        }
      }
    } else {
      alert.error("Please enter a valid Data");
    }
  };

  useEffect(() => {
    if (roleId) {
      getData("roles", roleId);
      setRoleError(false);
      setPermissionsError(false);
    }
  }, [roleId]);

  useEffect(() => {
    setRole(data);
    setInitialValues(data?.permissions?.map((p) => p.id));
  }, [data]);

  useEffect(() => {
    if (
      (roleRef.current?.value !== "" || roleRef.current?.value !== null) &&
      checkList?.length > 0
    ) {
      setShow(false);
    } else {
      setShow(true);
    }
  }, [permissionsError, roleRef.current?.value]);

  return (
    <div>
      <div className="px-5">
        <h1>{title} Role</h1>
        <form onSubmit={(e) => newRole(e)}>
          <div className="form">
            <div className="form-group w-50  mx-auto row my-5">
              <label
                className="col-md-2 col-sm-12 col-form-label"
                htmlFor="role"
              >
                Role
              </label>
              <div className="col-md-9 col-sm-12">
                <input
                  type="text"
                  className="form-control col-md-6"
                  defaultValue={role?.display_name}
                  ref={roleRef}
                  required
                  onChange={(e) =>
                    /^[a-zA-Z,\u0621-\u064A\u0660-\u0669 ]+$/.test(
                      e.target.value
                    )
                      ? setRoleError(false)
                      : setRoleError(true)
                  }
                />
                {roleError && (
                  <span className="error">
                    Please enter valid input No Special Charachters / No
                    Numbers.
                  </span>
                )}
              </div>
            </div>

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
                          checked={checkList?.find((per) => per === p.id)}
                          onChange={(e) => handleCheckList(e, p.id, p.id)}
                        />
                        <label htmlFor={p.id}>{p.display_name}</label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="row">
              {permissionsError && (
                <span className="error mb-3">
                  Please select at least one permission
                </span>
              )}
              <button
                className="btn bg-gold w-100"
                type="submit"
                disabled={show}
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewDepartment;
