import { useState } from "react";

export default function useCheckListHandler() {
  const [checkList, setCheckList] = useState([]);

  console.log(checkList);

  const handleCheckList = (e, id, object) => {
    console.log(e.target.checked, id, object);
    var updatedList = [...checkList];
    if (e.target.checked) {
      updatedList = [...checkList, object];
    } else {
      updatedList.splice(
        checkList.indexOf(checkList?.find((item) => item.id === id)),
        1
      );
    }
    setCheckList(updatedList);
    console.log(checkList?.indexOf(id));
  };

  const setInitialValues = (initList) => {
    if (initList) {
      setCheckList(initList);
    }
  };

  const handlePrice = (e, id) => {
    let newList = checkList.map((item) => {
      if (item.id === id) {
        item.selling_price = parseInt(e.target.value);
      }
      return item;
    });
    setCheckList(newList);
  };

  return {
    checkList,
    setCheckList,
    setInitialValues,
    handleCheckList,
    handlePrice,
  };
}
