// import RequestContext from "../../../../Context/RequestContext";
// import { getLanguages } from "../../../../Services/Languages";
import { useContext, useEffect, useState } from "react";
import "../../../../assets/css/create.css";
import { useParams } from "react-router-dom";
import useSimplePost from "../../../../customHooks/useSimplePost";
import { useAlert } from "react-alert";
import useToken from "../../../../customHooks/useToken";
import fetcher from "../../../../Services/fetcher";

function NewExtraType() {
  const {
    titles,
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
  const { extraTypeId } = useParams();
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

  const newExtraType = (e) => {
    e.preventDefault();

    if (!show) {
      if (extraTypeId) {
        formPost(extraTypeId, "extra-types", {
          languages: titles,
          isActive: isActive,
        });
      } else {
        formPost(null, "extra-types", {
          languages: titles,
          isActive: 1,
        });
      }
    } else {
      // setTypeError(true);
      alert.error("Please enter a valid Data");
    }
  };

  useEffect(() => {
    if (extraTypeId) {
      getData("extra-types", extraTypeId, token);
    } else {
      ResetErrors();
    }
  }, [extraTypeId, Languages]);

  return (
    <>
      <div className="container">
        <h1>{title}</h1>
        <form onSubmit={(e) => newExtraType(e)}>
          <div className="form w-50 mx-auto">
            {titles?.map((lang) => (
              <>
                <div className="form-group row my-5">
                  <label
                    className="col-md-3 col-sm-12 col-form-label"
                    htmlFor={`title${lang?.code}`}
                  >
                    Extra Type ({lang?.code})
                  </label>
                  <div className="col-md-9 col-sm-12">
                    <input
                      type="text"
                      className="form-control col-md-6"
                      required
                      id={`title${lang?.code}`}
                      name={`title-${lang?.code}`}
                      onChange={(e) => handleNames(lang?.code, e.target?.value)}
                      value={lang?.title}
                      defaultValue={lang?.title}
                    />
                  </div>
                </div>
              </>
            ))}

            {error?.find((err) => err.error === true) && (
              <span className="error">
                Please enter valid input No Special Charachters{" "}
              </span>
            )}

            <div className="d-flex justify-content-end">
              <button className="btn bg-gold " type="submit" disabled={show}>
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default NewExtraType;
