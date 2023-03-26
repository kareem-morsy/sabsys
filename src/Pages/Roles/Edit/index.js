import { useState, useEffect, useRef } from "react";
import "../../../assets/css/create.css";
import { useParams, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import useSimplePost from "../../../customHooks/useSimplePost";
import useCheckListHandler from "../../../customHooks/useCheckListHandler";
import useToken from "../../../customHooks/useToken";
import fetcher from "../../../Services/fetcher";

function EditRole() {
  const { roleId } = useParams();
  const { formPost } = useSimplePost();
  const { checkList, handleCheckList, setCheckList } = useCheckListHandler();
  const [permissions, setPermissions] = useState([]);
  const [role, setRole] = useState();

  useEffect(() => {
    fetcher(`permissions`)
      .then((data) => {
        if (data !== undefined) {
          setPermissions(data.data);
          // setCheckList(data?.data);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  useEffect(() => {
    if (roleId !== "undefined") {
      fetcher(`roles/${roleId}`).then((x) => setRole(x.data));
      //   setCheckList(x.data.permissions);
    }
  }, [roleId]);

  useEffect(() => {
    setCheckList(role?.permissions?.map((p) => ({ id: p.id, name: p.name })));
  }, [role]);

  const alert = useAlert();

  const roleRef = useRef();
  const [roleError, setRoleError] = useState(null);

  let RoleObj = {
    name: role?.name,
    display_name: role?.display_name,
    description: role?.description,
    permissions: checkList?.map((p) => p.id),
  };

  console.log(checkList);

  const newRole = (e) => {
    e.preventDefault();
    console.log(RoleObj);
    formPost(roleId, "roles", RoleObj);
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
                  defaultValue={role?.display_name}
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
                          checked={checkList?.find((per) => per.id == p.id)}
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

            <div className="row">
              {/* {permissionsError && (
                <span className="error mb-3">
                  Please select at least one permission
                </span>
              )} */}
              <button className="btn bg-gold w-100" type="submit">
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditRole;
