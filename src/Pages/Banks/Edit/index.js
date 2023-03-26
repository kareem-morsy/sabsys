import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useAlert } from "react-alert";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import fetcher, { putFetcher } from "../../../Services/fetcher";
import useSimplePost from "../../../customHooks/useSimplePost";

function EditBank() {
  const { formPost } = useSimplePost();
  const { bankId } = useParams();
  const location = useLocation();
  console.log("Locations", location.pathname);
  const [bank, setBank] = useState();

  useEffect(() => {
    bankId !== "undefined" &&
      fetcher(`banks/${bankId}`).then((x) => setBank(x));
  }, []);
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({ mode: "onBlur" });
  useEffect(() => {
    if (bank) {
      setValue("isActive", bank?.data?.isActive);
    }
  }, [bank]);

  const onSubmit = (data) => {
    console.log("weqwewq", data);
    const newData = Object.values(data);
    const newCode = Object.keys(data);
    console.log("newCode", newCode);

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

    formPost(bankId, "banks", PostObj);
  };

  return (
    <div>
      <div className="container">
        <h1>{bank?.data?.name} Bank</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form w-50 mx-auto">
            {bank?.data?.translations.map((lang) => (
              <>
                <div className="form-group row my-5">
                  <label
                    className="col-md-3 col-sm-12 col-form-label"
                    htmlFor={`title${lang?.code}`}
                  >
                    Name ({lang?.code})
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
                      defaultValue={`${lang?.name}`}
                    />
                    {/* errors will return when field validation fails  */}
                    {errors[`${lang?.name}`] && (
                      <span>This field is required</span>
                    )}
                  </div>
                </div>
              </>
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
                  {...register(`isActive`, {
                    required: false,
                  })}
                  // defaultChecked={bank?.data?.isActive}
                />
              </div>
            </div>
            <input type="submit" className="btn bg-gold w-100" value="Update"/>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditBank;
