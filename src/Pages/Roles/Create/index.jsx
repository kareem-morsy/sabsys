import { useState, useEffect, useRef } from "react";
import "../../../assets/css/create.css";
import { useAlert } from "react-alert";
import useSimplePost from "../../../customHooks/useSimplePost";
import useCheckListHandler from "../../../customHooks/useCheckListHandler";
import fetcher from "../../../Services/fetcher";

function NewDepartment() {
  const { formPost } = useSimplePost();
  const { checkList, handleCheckList } = useCheckListHandler();
  const [permissions, setPermissions] = useState([]);
  const [role, setRole] = useState();
  const [error, setError] = useState(false);

  useEffect(() => {
    fetcher(`permissions`)
      .then((data) => {
        if (data !== undefined) {
          setPermissions(data.data);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  const alert = useAlert();

  const roleRef = useRef();
  const [roleError, setRoleError] = useState(null);

  let RoleObj = {
    name: role,
    display_name: role,
    description: role,
    permissions: checkList,
  };

  console.log(RoleObj);

  const newRole = (e) => {
    e.preventDefault();
    console.log(RoleObj);

    if (checkList.lenght > 0) {
      setError(false);
      formPost(null, "roles", RoleObj);
    } else {
      setError(true);
    }
  };

  return (
    <div>
      <div className="px-5">
        <h1>Create Role</h1>
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
                  // defaultValue={role?.display_name}
                  onChange={(e) => setRole(e.target?.value)}
                  required
                />
              </div>
            </div>

            <h3 className="head mb-4">Permissions</h3>

            <div className=" px-5 d-flex flex-wrap">
              {permissions?.map((per) => (
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
              {error && (
                <span className="error mb-3">
                  Please select at least one permission
                </span>
              )}
              <button className="btn bg-gold w-100" type="submit">
                Create
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewDepartment;
