import RequestContext from "../../../Context/RequestContext";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useSimplePost from "../../../customHooks/useSimplePost";
import { getBankById } from "../../../Services/Banks";
import { useAlert } from "react-alert";
import { getLanguages } from "../../../Services/Languages";
import useToken from "../../../customHooks/useToken";
import fetcher from "../../../Services/fetcher";

function NewBank() {
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
  const { bankId } = useParams();
  // const { Languages } = useContext(RequestContext);
  const [Languages, setLanguages] = useState([]);
  const [ERROR, setError] = useState();
  const [refreshState, setRefreshState] = useState(null);

  const Refresh = (state) => {
    setRefreshState(state);
  };
  const { token } = useToken();

  useEffect(() => {
    fetcher("languages")
      .then((data) => {
        if (data !== undefined) {
          setLanguages(data.data);
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  useEffect(() => {
    if (bankId) {
      getBankById(bankId, token);
    }
  }, []);

  const newBank = (e) => {
    e.preventDefault();

    if (!show) {
      if (bankId) {
        formPost(bankId, "banks", { languages: names, isActive: isActive });
      } else {
        formPost(null, "banks", { languages: names, isActive: 1 });
      }
    } else {
      alert.error("Please enter a valid Data");
    }
  };

  useEffect(() => {
    if (bankId) {
      getData("banks", bankId);
    } else {
      ResetErrors();
    }
  }, [bankId, Languages]);

  return (
    <div>
      <div className="container">
        <h1>{title} Bank</h1>
        <form onSubmit={(e) => newBank(e)}>
          <div className="form w-50 mx-auto">
            {names?.map((lang) => (
              <>
                <div className="form-group row my-5">
                  <label
                    className="col-md-3 col-sm-12 col-form-label"
                    htmlFor={`title${lang?.code}`}
                  >
                    Name ({lang?.code})
                  </label>
                  <div className="col-md-9 col-sm-12">
                    <input
                      value={lang?.name}
                      type="text"
                      className="form-control col-md-6"
                      required
                      id={`title${lang?.code}`}
                      name={`title-${lang?.code}`}
                      onChange={(e) => handleNames(lang?.code, e.target.value)}
                      defaultValue={lang?.name}
                    />
                  </div>
                </div>
              </>
            ))}

            {error?.find((err) => err.error === true) && (
              <span className="error">Please Enter a Valid Input </span>
            )}

            <div className="d-flex ">
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

export default NewBank;
