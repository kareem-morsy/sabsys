import { useEffect, useState } from "react";
import "../../../../assets/css/create.css";
import { useForm } from "react-hook-form";
import fetcher from "../../../../Services/fetcher";
import useSimplePost from "../../../../customHooks/useSimplePost";
import { useParams } from "react-router-dom";

function EditClientType() {
  const { formPost } = useSimplePost();
  const { ClientTypeId } = useParams();
  const [type, setType] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    fetcher(`client-types/${ClientTypeId}`).then((x) => setType(x?.data));
  }, [ClientTypeId]);

  useEffect(() => {
    if (type) {
      console.log("bank", type?.isActive);
      setValue("isActive", type?.isActive);
    }
  }, [type]);

  console.log(ClientTypeId);

  const onSubmit = (data) => {
    console.log("data", data);
    const newData = Object.values(data);
    const newCode = Object.keys(data);

    const obj = [];
    for (let i = 0; i < newData.length; i++) {
      if (newCode[i] !== "isActive") {
        obj.push({
          code: newCode[i],
          name: newData[i],
        });
      }
    }
    const PostObj = {
      languages: obj,
      isActive: data?.isActive,
    };
    console.log("PostObj", PostObj);

    formPost(ClientTypeId, "client-types", PostObj);
  };

  return (
    <div>
      <div className="container">
        <h1>Edit Client Type</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form w-50 mx-auto">
            {type?.translations?.map((lang) => (
              <div className="form-group row mt-5 mb-3">
                <label
                  className="col-md-3 col-sm-12 col-form-label"
                  htmlFor={`title${lang?.code}`}
                >
                  Client Type ({lang?.code})
                </label>
                <div className="col-md-9 col-sm-12">
                  {/* register your input into the hook by invoking the "register" function */}
                  <input
                    className="form-control col-md-6"
                    id={`title${lang?.code}`}
                    // defaultValue="test"
                    {...register(`${lang?.code}`, {
                      required: true,
                    })}
                    defaultValue={`${lang?.name}`}
                  />
                  {/* errors will return when field validation fails  */}
                  {errors[`${lang?.name}`] && (
                    <span>This field is required</span>
                  )}
                </div>
                {errors[`${lang?.name}`] && <span>This field is required</span>}
              </div>
            ))}
            <div className="form-group row mb-3">
              <div className="col-md-9">
                <label
                  className="col-md-3 col-sm-12 col-form-label"
                  htmlFor="active"
                >
                  Active:
                </label>
                <input
                  id="active"
                  className="col-md-6"
                  type="checkbox"
                  {...register(`isActive`, {
                    required: false,
                  })}
                  // defaultChecked={bank?.data?.isActive}
                />
              </div>
            </div>
            <div className="d-flex justify-content-end">
              <button className="btn bg-gold w-100" type="submit">
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditClientType;
