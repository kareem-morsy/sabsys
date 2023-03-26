import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import fetcher from "../../../Services/fetcher";
import useSimplePost from "../../../customHooks/useSimplePost";

function NewBank() {
  const { formPost } = useSimplePost();
  const [languages, setLanguages] = useState();

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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
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
    formPost(null, "banks", PostObj);
  };
  return (
    <div>
      <div className="container">
        <h1>Create Bank</h1>
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
                    Name ({lang?.name})
                  </label>
                  <div className="col-md-9 col-sm-12">
                    {/* register your input into the hook by invoking the "register" function */}
                    <input
                      className="form-control col-md-6"
                      id={`title${lang?.name}`}
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
                </div>
              ))}
            <div className="form-group row mt-5 mb-3">
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
                  defaultChecked={true}
                  {...register(`isActive`, {
                    required: false,
                  })}
                />
              </div>
            </div>
            <input type="submit" className="btn bg-gold w-100" value="Create"/>
          </div>
        </form>
      </div>
    </div>
  );
}
export default NewBank;
