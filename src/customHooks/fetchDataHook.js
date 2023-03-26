import { useState } from "react";
import fetcher from "../Services/fetcher";

export default function FetchDataHook() {
  // const [error, setError] = useState(null);
  // const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [paginationn, setPaginationn] = useState();

  const fetchData = async (target, page, per_page, searchKeyword) => {
    console.log(target);
    fetcher(
      `${
        target?.includes(`previous_collections`)
          ? `${target}?page=${page}&limit=${per_page}`
          : `${target}?page=${page}&limit=${per_page}&search=${searchKeyword}`
      }`
    ).then(
      (result) => {
        console.log("result", result);
        // setIsLoaded(true);
        setItems(result?.data);
        setTotalRows(result?.pagination?.total);
        setPaginationn(result?.pagination);
      }
      // (error) => {
      //   setIsLoaded(true);
      //   setError(error);
      // }
    );
  };
  return {
    items,
    totalRows,
    paginationn,
    fetchData,
    setItems,
  };
}
