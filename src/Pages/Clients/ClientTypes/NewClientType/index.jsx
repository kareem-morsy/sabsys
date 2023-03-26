import { useEffect, useState } from "react";
import "../../../../assets/css/create.css";
import { useForm } from "react-hook-form";
import fetcher from "../../../../Services/fetcher";
import useSimplePost from "../../../../customHooks/useSimplePost";

function NewClientType() {
  const { formPost } = useSimplePost();
  const [languages, setLanguages] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    fetcher("languages")
      .then((data) => {
        if (data !== undefined) {
          setLanguages(data.data);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

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

    formPost(null, "client-types", PostObj);
  };

  return (
    <div>
      <div className="container">
        <h1>Create Client Type</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form w-50 mx-auto">
            {languages
              ?.filter((lang) => lang.isActive === true)
              ?.map((lang) => (
                <div className="form-group row mt-5 mb-3">
                  <label
                    className="col-md-3 col-sm-12 col-form-label"
                    htmlFor={`title${lang?.code}`}
                  >
                    Client Type ({lang?.code})
                  </label>
                  <div className="col-md-9 col-sm-12">
                    <input
                      className="form-control col-md-6"
                      id={`title${lang?.code}`}
                      // defaultValue="test"
                      {...register(`${lang?.code}`, {
                        required: true,
                      })}
                      placeholder={`${lang?.name}`}
                    />
                    {/* errors will return when field validation fails  */}
                    {errors[`${lang?.name}`] && (
                      <span>This field is required</span>
                    )}
                  </div>
                  {errors[`${lang?.name}`] && (
                    <span>This field is required</span>
                  )}
                </div>
              ))}
            <div className="form-group row mb-3">
              <div className="col-md-12">
                <label
                  className="col-md-1 col-sm-12 col-form-label"
                  htmlFor="active"
                >
                  Active:
                </label>
                <input
                  id="active"
                  className="col-md-6"
                  type="checkbox"
                  defaultChecked={true}
                  {...register(`isActive`, {
                    required: false,
                  })}
                  // defaultChecked={bank?.data?.isActive}
                />
              </div>
            </div>
            <div className="d-flex justify-content-end">
              <button className="btn bg-gold w-100" type="submit">
                Create
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewClientType;
