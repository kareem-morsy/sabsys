import "../../../../assets/css/create.css";
import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { useAlert } from "react-alert";
import useSimplePost from "../../../../customHooks/useSimplePost";
import useToken from "../../../../customHooks/useToken";

function NewRoomType() {
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
  const { roomTypeId } = useParams();
  const [personNo, setPersonNo] = useState(null);
  const [personError, setPersonError] = useState(false);

  const newRoomType = (e) => {
    e.preventDefault();

    if (!show && personNo !== null) {
      if (roomTypeId) {
        formPost(roomTypeId, "room-types", {
          languages: titles,
          isActive: isActive,
          persons: personNo,
        });
      } else {
        formPost(null, "room-types", {
          languages: titles,
          isActive: 1,
          persons: personNo,
        });
      }
    } else {
      setPersonError(true);
      alert.error("Please enter a valid Data");
    }
  };

  // useEffect(() => {
  //   if (!show || personNo) {
  //     setPersonError(false);
  //   } else {
  //     setPersonError(true);
  //   }
  // }, [personNo]);

  const { token } = useToken();
  useEffect(() => {
    if (roomTypeId) {
      if (token) {
        getData("room-types", roomTypeId, token);
      }
    } else {
      ResetErrors();
    }
  }, [roomTypeId]);

  useEffect(() => {
    setPersonNo(data?.persons);
  }, [data]);

  return (
    <div>
      <div className="container">
        <h1>{title} Room Type</h1>
        <form onSubmit={(e) => newRoomType(e)}>
          <div className="form w-50 mx-auto">
            {titles?.map((lang) => (
              <div className="form-group row my-5">
                <label
                  className="col-md-3 col-sm-12 col-form-label"
                  htmlFor={`title${lang?.code}`}
                >
                  Room Type ({lang?.code})
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
                    // defaultValue={lang?.title}
                  />
                </div>
              </div>
            ))}

            {error?.find((err) => err.error === true) && (
              <span className="error">Please Enter a Valid Input </span>
            )}

            <div className="form-group row my-5">
              <label className="col-md-3 col-sm-12 col-form-label">
                No. of persons
              </label>
              <div className="col-md-9 col-sm-12">
                <input
                  type="number"
                  min={1}
                  defaultValue={personNo}
                  onChange={(e) => setPersonNo(e.target.value)}
                  className="form-control col-md-6"
                  required
                  onBlur={(e) =>
                    /^(?:[1-9]|0[1-9]|1[0-9]|20)$/.test(e.target.value)
                      ? setPersonError(false)
                      : setPersonError(true)
                  }
                />
                {personError && (
                  <span className="error">
                    Please Enter a Valid Input / Must Be number
                  </span>
                )}
              </div>
            </div>

            <div className="row">
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

export default NewRoomType;
