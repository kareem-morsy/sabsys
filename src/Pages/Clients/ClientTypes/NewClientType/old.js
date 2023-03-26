import { useEffect, useState } from "react";
import "../../../../../assets/css/create.css";
import { useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import useSimplePost from "../../../../../customHooks/useSimplePost";
import useToken from "../../../../../customHooks/useToken";
import fetcher from "../../../../../Services/fetcher";

function NewClientType() {
  const {
    names,
    title,
    isActive,
    error,
    show,
    formPost,
    getData,
    handleNames,
    ResetErrors,
  } = useSimplePost();
  const alert = useAlert();
  const { ClientTypeId } = useParams();
  // const { Languages } = useContext(RequestContext);
  const [Languages, setLanguages] = useState([]);
  const [ERROR, setError] = useState();
  const [refreshState, setRefreshState] = useState(null);

  const Refresh = (state) => {
    setRefreshState(state);
  };
  const { token } = useToken();

  useEffect(() => {
    fetcher(`languages`)
      .then((data) => {
        if (data !== undefined) {
          setLanguages(data.data);
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  console.log(names);

  const newClientType = (e) => {
    e.preventDefault();

    if (!show) {
      if (ClientTypeId) {
        formPost(ClientTypeId, "client-types", {
          languages: names,
          isActive: isActive,
        });
      } else {
        formPost(null, "client-types", { languages: names, isActive: 1 });
      }
    } else {
      alert.error("Please enter a valid Data");
    }
  };

  useEffect(() => {
    if (ClientTypeId) {
      getData("client-types", ClientTypeId, token);
    } else {
      ResetErrors();
    }
  }, [ClientTypeId, Languages]);

  return (
    <div>
      <div className="container">
        <h1>{title} Client Type</h1>
        <form onSubmit={(e) => newClientType(e)}>
          <div className="form w-50 mx-auto">
            {names?.map((lang) => (
              <div key={lang.code}>
                <div className="form-group row my-5">
                  <label
                    className="col-md-3 col-sm-12 col-form-label"
                    htmlFor={`title${lang?.code}`}
                  >
                    Client Type ({lang?.code})
                  </label>
                  <div className="col-md-9 col-sm-12">
                    <input
                      type="text"
                      className="form-control col-md-6"
                      required
                      id={`title${lang?.code}`}
                      name={`title-${lang?.code}`}
                      onChange={(e) => handleNames(lang?.code, e.target?.value)}
                      value={lang?.name}
                      defaultValue={lang?.name}
                    />
                  </div>
                </div>
              </div>
            ))}

            {error?.find((err) => err.error === true) && (
              <span className="error">
                Please enter valid input No Special Charachters / No Numbers.
              </span>
            )}

            <div className="d-flex justify-content-end">
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

export default NewClientType;
