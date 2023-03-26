import { useEffect } from "react";
import "../../../../assets/css/create.css";
import { useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import useSimplePost from "../../../../customHooks/useSimplePost";
import useToken from "../../../../customHooks/useToken";

function NewRoomView() {
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
  const { roomViewId } = useParams();

  const newRoomView = (e) => {
    e.preventDefault();

    if (!show) {
      if (roomViewId) {
        formPost(roomViewId, "room-views", {
          languages: titles,
          isActive: isActive,
        });
      } else {
        formPost(null, "room-views", {
          languages: titles,
          isActive: 1,
        });
      }
    } else {
      alert.error("Please enter a valid Data");
    }
  };

  const { token } = useToken();
  useEffect(() => {
    if (roomViewId) {
      if (token) {
        getData("room-views", roomViewId, token);
      }
    } else {
      ResetErrors();
    }
  }, [roomViewId]);

  return (
    <div>
      <div className="container">
        <h1>{title}</h1>
        <form onSubmit={(e) => newRoomView(e)}>
          <div className="form w-50 mx-auto">
            {titles?.map((lang) => (
              <>
                <div className="form-group row my-5">
                  <label
                    className="col-md-3 col-sm-12 col-form-label"
                    htmlFor={`title${lang?.code}`}
                  >
                    Room View ({lang?.code})
                  </label>
                  <div className="col-md-9 col-sm-12">
                    <input
                      type="text"
                      className="form-control col-md-6"
                      required
                      id={`title${lang?.code}`}
                      name={`title-${lang?.code}`}
                      onChange={(e) => handleNames(lang?.code, e.target.value)}
                      value={lang?.title}
                      defaultValue={lang?.title}
                    />
                  </div>
                </div>
              </>
            ))}

            {error?.find((err) => err.error === true) && (
              <span className="error">Please Enter a Valid Input </span>
            )}

            <div className="row my-5">
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

export default NewRoomView;
