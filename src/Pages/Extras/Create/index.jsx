// import RequestContext from "../../../Context/RequestContext";
import { useContext, useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import Select from "react-select";
import useSimplePost from "../../../customHooks/useSimplePost";
import { useAlert } from "react-alert";
import { getExtraTypes } from "../../../Services/ExtraTypes";
import { getLanguages } from "../../../Services/Languages";
import useToken from "../../../customHooks/useToken";
import fetcher from "../../../Services/fetcher";

function NewExtra() {
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
  const { extraId } = useParams();
  // const { ExtraTypes, Languages } = useContext(RequestContext);
  const [ExtraTypes, setExtraTypes] = useState([]);
  const [Languages, setLanguages] = useState([]);
  const [ERROR, setError] = useState();
  const [refreshState, setRefreshState] = useState(null);

  const Refresh = (state) => {
    setRefreshState(state);
  };
  const { token } = useToken();

  useEffect(() => {
    fetcher(`extra-types`)
      .then((data) => {
        if (data !== undefined) {
          setExtraTypes(data.data);
          console.log(data.data);
        }
      })
      .catch((error) => {
        setError(error.message);
      });
    console.log(ExtraTypes);
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
  const [extraType, setExtraType] = useState(null);
  const [typeError, setTypeError] = useState(null);

  console.log("titles", titles);

  const handleSelect = (type) => {
    setExtraType(type);
    setTypeError(false);
  };

  useEffect(() => {
    if (!show || extraType) {
      setTypeError(false);
    } else {
      setTypeError(true);
    }
  }, [extraType]);

  console.log(extraType);

  const newExtra = (e) => {
    e.preventDefault();

    if (!show && extraType !== null) {
      if (extraId) {
        formPost(extraId, "extras", {
          languages: titles,
          isActive: isActive,
          extra_type_id: extraType.value,
        });
      } else {
        formPost(null, "extras", {
          languages: titles,
          isActive: 1,
          extra_type_id: extraType.value,
        });
      }
    } else {
      setTypeError(true);
      alert.error("Please enter a valid Data");
    }
  };

  useEffect(() => {
    if (extraId) {
      getData("extras", extraId, token);
    } else {
      ResetErrors();
    }
  }, [extraId, Languages]);

  useEffect(() => {
    setExtraType({ value: data?.id, label: data?.type });
  }, [data]);

  console.log(data);

  return (
    <div>
      <div className="container">
        <h1>{title} Extra</h1>
        <form onSubmit={(e) => newExtra(e)}>
          <div className="form w-50 mx-auto">
            <div className="form-group row mt-5">
              <label className="col-md-3 col-sm-12 col-form-label">
                Extra Type
              </label>
              <div className="col-md-9 col-sm-12">
                <Select
                  value={{
                    value: extraType?.value,
                    label: extraType?.label,
                  }}
                  isMulti={false}
                  isClearable={false}
                  options={ExtraTypes?.map((type) => ({
                    value: type?.id,
                    label: type?.type,
                  }))}
                  classNamePrefix="Select"
                  onChange={(e) => handleSelect(e)}
                />

                {typeError && (
                  <span className="error mt-2">Please Select Type</span>
                )}
              </div>
            </div>

            {titles?.map((lang) => (
              <>
                <div className="form-group row my-5">
                  <label
                    className="col-md-3 col-sm-12 col-form-label"
                    htmlFor={`title${lang?.code}`}
                  >
                    Extra ({lang?.code})
                  </label>
                  <div className="col-md-9 col-sm-12">
                    <input
                      type="text"
                      className="form-control col-md-6"
                      id={`title${lang?.code}`}
                      name={`title-${lang?.code}`}
                      required
                      onChange={(e) => handleNames(lang?.code, e.target.value)}
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
              <button
                className="btn bg-gold w-100"
                type="submit"
                disabled={show && extraType === null}
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
export default NewExtra;
