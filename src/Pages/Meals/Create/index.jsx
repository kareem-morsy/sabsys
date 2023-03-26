import { useState, useEffect, useContext } from "react";
import "../../../assets/css/create.css";
import { useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import useSimplePost from "../../../customHooks/useSimplePost";
import RequestContext from "../../../Context/RequestContext";
import { regexTitle } from "../../../Functions/regex";
import { getLanguages } from "../../../Services/Languages";
import useToken from "../../../customHooks/useToken";
import fetcher from "../../../Services/fetcher";

function NewMeal() {
  const {
    data,
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
  const { mealId } = useParams();
  const [code, setCode] = useState(null);
  const [codeError, setCodeError] = useState(null);

  const handleCode = (code) => {
    if (code) {
      if (regexTitle(code)) {
        console.log(code);
        setCodeError(false);
        setCode(code);
      } else {
        setCodeError(true);
        console.log(code);
      }
    }
  };

  const newMeal = (e) => {
    e.preventDefault();

    if (codeError !== true) {
      if (mealId) {
        formPost(mealId, "meals", {
          languages: titles,
          isActive: isActive,
          code: code,
        });
      } else {
        formPost(null, "meals", {
          languages: titles,
          isActive: 1,
          code: code,
        });
      }
    } else {
      alert.error("Please enter a valid Data");
    }
  };

  useEffect(() => {
    if (mealId) {
      getData("meals", mealId, token);
    } else {
      ResetErrors();
    }
  }, [mealId, Languages]);

  useEffect(() => setCode(data?.code), [data]);
  console.log(codeError);

  return (
    <div>
      <div className="container">
        <h1>{title} Meal</h1>
        <form onSubmit={(e) => newMeal(e)}>
          <div className="form w-50 mx-auto">
            {titles?.map((lang) => (
              <>
                <div className="form-group row my-5">
                  <label
                    className="col-md-3 col-sm-12 col-form-label"
                    htmlFor={`title${lang?.code}`}
                  >
                    Meal ({lang?.code})
                  </label>
                  <div className="col-md-9 col-sm-12">
                    <input
                      type="text"
                      className="form-control col-md-6"
                      id={`title${lang?.code}`}
                      name={`title-${lang?.code}`}
                      required
                      value={lang?.title}
                      onChange={(e) => handleNames(lang?.code, e.target.value)}
                    />
                  </div>
                </div>
              </>
            ))}

            {error?.find((err) => err.error === true) && (
              <span className="error">
                Please enter valid Input No Special Charachters{" "}
              </span>
            )}

            <div className="form-group row my-5">
              <label className="col-md-3 col-sm-12 col-form-label">Code</label>
              <div className="col-md-3 col-sm-12">
                <input
                  type="text"
                  className="form-control col-md-6"
                  id="code"
                  name="code"
                  defaultValue={code}
                  required
                  onChange={(e) => handleCode(e.target.value)}
                />
              </div>

              {codeError && (
                <span className="error mt-2">
                  Please enter valid Code No Special Charachters except (- /_ /
                  #)
                </span>
              )}
            </div>

            <div className="row">
              <button
                className="btn bg-gold w-100"
                type="submit"
                disabled={show && !code}
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

export default NewMeal;
