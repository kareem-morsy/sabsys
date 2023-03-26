import { useEffect, useState } from "react";
import fetcher from "../../Services/fetcher";
import { Modal, Button } from "react-bootstrap";

const PriceDetailsPopup = ({
  handlePricePopup,
  slots,
  subTotal,
  vat,
  Show,
}) => {
  const [RoomTypes, setRoomTypes] = useState([]);
  const [RoomViews, setRoomViews] = useState([]);

  useEffect(() => {
    fetcher(`room-types/list`).then((data) => {
      if (data !== undefined) {
        setRoomTypes(data.data);
        console.log(data);
      }
    });
  }, []);

  useEffect(() => {
    fetcher(`room-views/list`).then((data) => {
      if (data !== undefined) {
        setRoomViews(data.data);
      }
    });
  }, []);

  return (
    <Modal show={Show} onHide={() => handlePricePopup(false)} size="md">
      {/* <Modal.Header closeButton></Modal.Header> */}
      <Modal.Body>
        <div className="mt-3">
          <div className="title">Price Breakdown</div>

          <div className="price-breakdown">
            <div className="breakdown">
              {slots &&
                slots.map((slot, index) => (
                  <div key={index} className="row mx-2">
                    <div className="col-6">
                      <span>
                        {
                          RoomTypes.find(
                            (type) => type.id === slot.room_type_id
                          )?.title
                        }
                      </span>{" "}
                      -{" "}
                      <span>
                        {
                          RoomViews.find(
                            (view) => view.id === slot.room_view_id
                          )?.title
                        }
                      </span>
                    </div>
                    <span className="col-3">{slot.nights.length} nights</span>
                    <span className="col-3">
                      $
                      {(slot.sub_total +
                        slot.meal_price +
                        slot.total_extras_price) *
                        slot.room_duplicate}
                    </span>
                  </div>
                ))}
            </div>
            <div className="exclude-charges">
              <p>Exclude Charges</p>
              <div className="row mx-2 charges-details">
                <span className="col-6">Extras Charge: </span>
                <span className="col-6">
                  {" "}
                  $
                  {slots
                    .map((slot) => slot.total_extras_price)
                    ?.reduce(
                      (sub_total, currentItem) =>
                        (sub_total = Number(sub_total) + Number(currentItem)),
                      0
                    )}
                </span>
              </div>
            </div>
          </div>

          <div className="row px-2 mt-2 total ">
            <span className="col">SubTotal: </span>
            <span className="col">${subTotal}</span>
          </div>

          <div className="row px-2 total">
            <span className="col">Vat: </span>
            <span className="col">${vat}</span>
            {/* <div className="col-12">Vat: ${vat}</div> */}
          </div>

          <div className="row px-2 total">
            <span className="col">Total: </span>
            <span className="col">${subTotal + vat}</span>
            {/* <div className="col-12">Total: ${subTotal + vat}</div> */}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          className="btn bg-gold"
          variant="secondary"
          onClick={() => handlePricePopup(false)}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PriceDetailsPopup;
