import { useEffect } from "preact/hooks";
import useCheckListHandler from "../../customHooks/useCheckListHandler";

const CheckList = ({ title, data, checkedList }) => {
  const { checkList, handleCheckList, setInitialValues } =
    useCheckListHandler();

  const handlePrice = (e, id) => {
    let newItem = checkList.map((checkedItem) => {
      if (checkedItem.id === id) {
        checkedItem.price = parseInt(e.target.value);
      }
      return checkedItem;
    });
    setInitialValues(newItem);
  };

  useEffect(() => setInitialValues(checkedList), [checkedList]);

  return (
    <div className="mb-4">
      <h5 className="head mb-4">{title}</h5>
      <div className="d-flex flex-wrap">
        {data?.map((item) => (
          <div className="col-md-4 my-2" key={item.id}>
            <div className="row">
              <div className="col-md-9">
                <input
                  className="meals"
                  type="checkbox"
                  id={item.title}
                  value={item.title}
                  checked={
                    checkList?.find((checkedItem) => checkedItem.id === item.id)
                      ? true
                      : false
                  }
                  onChange={(e) =>
                    handleCheckList(e, item.id, {
                      id: item.id,
                      title: e.target.value,
                      selling_price: 0,
                    })
                  }
                />
                <label htmlFor={item.title}>{item.title}</label>
              </div>
              <input
                className="input col-md-3"
                type="number"
                min="0"
                max="1000"
                name="price"
                id={item.id}
                value={
                  checkList?.find((checkedItem) => checkedItem.id === item.id)
                    ?.selling_price
                }
                onChange={(e) => handlePrice(e, item.id)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheckList;
