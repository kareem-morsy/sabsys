import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import { regexTitle } from "../Functions/regex";
import { AxiosInstance } from "../Network/AxiosInstance";
import fetcher, {
  postFetcher,
  putFetcher,
  deleteFetcher,
} from "../Services/fetcher";

export default function useSimplePost() {
  const [data, setData] = useState();
  const [names, setNames] = useState([]);
  const [brands, setBrands] = useState([]);
  const [titles, setTitles] = useState([]);
  const [title, setTitle] = useState("New");
  const [isActive, setIsActive] = useState(1);
  const [error, setError] = useState(null);
  const [show, setShow] = useState(true);
  const alert = useAlert();
  // const { Languages, Refresh } = useContext(RequestContext);
  const [Languages, setLang] = useState([]);
  const [refreshState, setRefreshState] = useState(null);

  const Refresh = (state) => {
    setRefreshState(state);
  };

  useEffect(() => {
    fetcher("languages")
      .then((data) => {
        if (data !== undefined) {
          setLang(data.data);
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);
  const navigate = useNavigate();

  const handleNames = async (code, value) => {
    const name = names?.map((t) => {
      if (t.code === code) {
        t.name = value;
      }
      return t;
    });
    setNames(name);

    const titless = titles?.map((t) => {
      if (t.code === code) {
        t.title = value;
      }
      return t;
    });
    setTitles(titless);

    const brandss = brands?.map((t) => {
      if (t.code === code) {
        t.brand = value;
      }
      return t;
    });
    setBrands(brandss);

    const errors = error?.map((err) => {
      if (err.code === code) {
        if (regexTitle(value)) {
          err.error = false;
        } else {
          err.error = true;
        }
      }
      return err;
    });

    setError(errors);
  };

  const formPost = async (id, name, formObject, formData) => {
    console.log(formObject);
    if (id == null) {
      await postFetcher(name, formObject, formData)
        .then((res) => {
          if (
            res?.statusCode === 200 ||
            res?.status === 200 ||
            res?.message === "success"
          ) {
            console.log(res);
            alert.success("Item Updated Successfully");
            Reset();
            setShow(true);
            Refresh(name);
            navigate(-1);
          } else {
            console.log("error", res);
            setShow(true);
            res?.message
              ? alert.error(res?.message)
              : alert.error("Error, please try again with valid data");
          }
        })
        .catch((errors) => {
          console.log(errors?.response?.data);
          setShow(true);
          // errors?.response?.data?.errors?.map((err) => console.log(err));
          errors?.message
            ? alert.error(errors?.message)
            : alert.error("Error, please try again with valid data");
        });
    } else {
      const data = await putFetcher(`${name}/${id}`, formObject);
      if (
        data?.statusCode === 200 ||
        data?.status === 200 ||
        data?.message === "success"
      ) {
        console.log(data);
        alert.success("Item Updated Successfully");
        Reset();
        setShow(true);
        Refresh(name);
        navigate(-1);
      } else {
        console.log("error", data);
        setShow(true);
        alert.error(data?.message);
      }
    }
  };

  const Delete = (id, name) => {
    const data = deleteFetcher(`${name}/${id}`);

    if (data.statusCode === 200) {
      alert.success("Item Deleted Successfully");
      navigate(-1);
      Reset();
    } else {
      data?.errors?.map((err) => alert.error(err));
    }
  };

  const getData = async (name, id) => {
    await AxiosInstance.get(`${name}/${id}`)
      .then((data) => {
        if (data !== undefined) {
          setData(data.data.data);
          setTitle("Edit");
          setIsActive(data.data.isActive);
          setError(
            Languages?.filter((lang) => lang.isActive === true)?.map((l) => ({
              code: l?.code,
              error: false,
            }))
          );
        }
      })
      .catch((err) => console.log(err));
  };

  const ResetErrors = () => {
    setError(
      Languages?.filter((lang) => lang.isActive === true)?.map((l) => ({
        code: l?.code,
        error: "",
      }))
    );
  };

  const Reset = () => {
    ResetErrors();
    setData({});
    setShow(true);
  };

  useEffect(() => {
    if (
      error?.find((err) => err.error === true) ||
      error?.find((err) => err.error === "")
    ) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [error]);

  useEffect(() => {
    setNames(
      Languages?.filter((lang) => lang.isActive === true)?.map((l) => ({
        code: l?.code,
        name: "",
      }))
    );
    setTitles(
      Languages?.filter((lang) => lang.isActive === true)?.map((l) => ({
        code: l?.code,
        title: "",
      }))
    );
  }, [Languages]);

  useEffect(() => {
    data?.translations?.map((trans) =>
      trans.name
        ? handleNames(trans.code, trans.name)
        : handleNames(trans.code, trans.title)
    );
  }, [data]);

  return {
    data,
    names,
    titles,
    title,
    show,
    error,
    isActive,
    handleNames,
    formPost,
    Delete,
    getData,
    Reset,
    ResetErrors,
  };
}
