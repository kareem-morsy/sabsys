import RequestContext from "../../../../Context/RequestContext";
import { useContext, useEffect, useState } from "react";
import "../../../../assets/css/create.css";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import useSimplePost from "../../../../customHooks/useSimplePost";
import { useAlert } from "react-alert";
import { getCountries } from "../../../../Services/Countries";
import { getLanguages } from "../../../../Services/Languages";
import useToken from "../../../../customHooks/useToken";
import fetcher from "../../../../Services/fetcher";

function NewCity() {
  const {
    data,
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
  const { cityId } = useParams();
  const [country, setCountry] = useState(null);
  // const { Countries, Languages } = useContext(RequestContext);
  const [Countries, setCountries] = useState([]);
  const [Languages, setLanguages] = useState([]);
  const [ERROR, setError] = useState();
  const [refreshState, setRefreshState] = useState(null);

  const Refresh = (state) => {
    setRefreshState(state);
  };
  const { token } = useToken();

  useEffect(() => {
    fetcher(`cities`)
      .then((data) => {
        if (data !== undefined) {
          setCountries(data.data);
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);
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
  const [countryError, setCountryError] = useState(false);

  const handleSelect = (country) => {
    setCountry(country);
    setCountryError(false);
  };
  const navigate = useNavigate();
  const newCity = (e) => {
    e.preventDefault();

    if (!show && country !== null) {
      if (cityId) {
        formPost(cityId, "cities", {
          languages: names,
          isActive: isActive,
          parent_id: country?.value,
        }).then(() => {
          navigate("/cities");
        });
      } else {
        formPost(null, "cities", {
          languages: names,
          isActive: 1,
          parent_id: country?.value,
        });
      }
    } else {
      setCountryError(true);
      alert.error("Please enter a valid Data");
    }
  };

  useEffect(() => {
    if (cityId) {
      getData("cities", cityId, token);
    } else {
      ResetErrors();
    }
  }, [cityId, Languages]);

  useEffect(() => {
    setCountry({ value: data?.country?.id, label: data?.country?.name });
  }, [data]);

  return (
    <div>
      <div className="container">
        <h1>{title} City</h1>
        <form onSubmit={(e) => newCity(e)}>
          <div className="form w-50 mx-auto">
            <div className="form-group row mt-5">
              <label className="col-md-3 col-sm-12 col-form-label">
                Country
              </label>
              <div className="col-md-9 col-sm-12">
                <Select
                  value={{ value: country?.value, label: country?.label }}
                  isMulti={false}
                  isClearable={false}
                  options={Countries?.map((c) => ({
                    value: c?.id,
                    label: c?.name,
                  }))}
                  required
                  classNamePrefix="Select"
                  onChange={(e) => handleSelect(e)}
                />
                {countryError && (
                  <span className="error mt-4">Please select country.</span>
                )}
              </div>
            </div>

            {names?.map((lang) => (
              <>
                <div className="form-group row my-5">
                  <label
                    className="col-md-3 col-sm-12 col-form-label"
                    htmlFor={`title${lang?.code}`}
                  >
                    City ({lang?.code})
                  </label>
                  <div className="col-md-9 col-sm-12">
                    <input
                      type="text"
                      className="form-control col-md-6"
                      required
                      id={`title${lang?.code}`}
                      name={`title-${lang?.code}`}
                      value={lang?.name}
                      onChange={(e) => handleNames(lang?.code, e.target.value)}
                      defaultValue={lang?.name}
                    />
                  </div>
                </div>
              </>
            ))}

            {error?.find((err) => err.error === true) && (
              <span className="error mt-5">
                Please enter valid input No Special Charachters / No Numbers.
              </span>
            )}

            <div className="d-flex justify-content-end">
              <button
                className="btn bg-gold w-100"
                type="submit"
                disabled={show && country === null}
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

export default NewCity;
