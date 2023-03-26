// import { useState } from "react";
// import { useEffect } from "react";
// import { useParams } from "react-router";
// import fetcher from "../../../../Services/fetcher";
// import { Modal, Button } from "react-bootstrap";

// const StatmentDetails = () => {
//   const { clientId, id } = useParams();
//   const [data, setData] = useState();
//   const [showAttach, setShowAttach] = useState(false);
//   const [attachId, setAttachId] = useState();
//   const CloseAttach = () => {
//     setShowAttach(false);
//   };
//   const ShowAttach = (id) => {
//     setShowAttach(true);
//     setAttachId(id);
//   };

//   useEffect(() => {
//     fetcher(`clients/${clientId}/statement/${id}`).then((x) => setData(x.data));
//   }, []);

//   return (
//     <div className="container ">
//       <h1>Statment Details</h1>
//       <div className="form-group row">
//         <div className="col-md-4 col-sm-12 mb-3">
//           <label className="filter-lable">Client</label>
//           <p>{data?.client_name}</p>
//         </div>
//         <div className="col-md-4 col-sm-12 mb-3">
//           <label className="filter-lable">Created By</label>
//           <p>{data?.creator}</p>
//         </div>
//         <div className="col-md-4 col-sm-12 mb-3">
//           <label className="filter-lable">Amount</label>
//           <p>{data?.amount}</p>
//         </div>
//         <div className="col-md-4 col-sm-12 mb-3">
//           <label className="filter-lable">Payment Type</label>
//           <p>{data?.payment_type}</p>
//         </div>
//         <div className="col-md-4 col-sm-12 mb-3">
//           <label className="filter-lable">Payment Method</label>
//           <p>{data?.payment_method}</p>
//         </div>
//         <div className="col-md-4 col-sm-12 mb-3">
//           <label className="filter-lable">Status</label>
//           <p>{data?.status_text}</p>
//         </div>
//         <div className="col-md-4 col-sm-12 mb-3">
//           <label className="filter-lable">Created At</label>
//           <p>{data?.created_at}</p>
//         </div>
//         <div className="col-md-4 col-sm-12 mb-3">
//           <label className="filter-lable">Notes</label>
//           <p>{data?.notes}</p>
//         </div>

//         <div className="attachments">
//           <h1 className="my-3">Attachments</h1>
//           {data?.attachments?.length > 0 ? (
//             <div className="row info-box py-4">
//               {data?.attachments?.map((doc, i) => (
//                 <div className="col-3" onClick={() => ShowAttach(i)}>
//                   <img
//                     src={doc?.file}
//                     className="img-fluid w-100"
//                     style={{ objectFit: "cover", cursor: "pointer" }}
//                   />
//                   <p className="doc mt-2">{doc.attachment_path}</p>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <p className="text-center">There is no attachments!</p>
//           )}
//         </div>
//       </div>
//       <Modal show={showAttach} onHide={CloseAttach} size="lg">
//         <Modal.Header closeButton></Modal.Header>
//         <Modal.Body>
//           <img
//             src={data?.attachments[attachId]?.file}
//             className="img-fluid w-100"
//           />
//         </Modal.Body>
//       </Modal>
//     </div>
//   );
// };

// export default StatmentDetails;





import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import fetcher from "../../../../Services/fetcher";
import { Modal, Button } from "react-bootstrap";
import './Statment.css'
import murabahat from '../'

const StatmentDetails = () => {
  const { clientId, id } = useParams();
  const [data, setData] = useState();
  const [showAttach, setShowAttach] = useState(false);
  const [attachId, setAttachId] = useState();
  const CloseAttach = () => {
    setShowAttach(false);
  };
  const ShowAttach = (id) => {
    setShowAttach(true);
    setAttachId(id);
  };

  useEffect(() => {
    fetcher(`clients/${clientId}/statement/${id}`).then((x) => setData(x.data));
  }, []);

  return (
    <>
        <div className="containerDiv">

            <div class="main-header">
                
                <img src="../" alt="logo"/>
            </div>


            <div className="statementDet">

                <h1>Statment Details</h1>


                <div className="UnitRow center-text">
                  <div className="unitCol">
                    <h2>سند قبض</h2>
                    <h2>Receipt Voucher</h2>
                    <h3>NO:</h3>
                  </div>

                </div>

                <div className="UnitRow DatePrice">
                  <div class="headFooter">
                      
                      <div class="unitDate">
                          <span>التاريخ</span>
                          <span class="whitespace text-center gray">12</span>
                          <span>/</span>
                          <span  class="whitespace text-center gray">11</span>
                          <span>/</span>
                          <span  class="whitespace text-center gray">1992</span>
                          <span>Date</span>
                      </div>


                      <div class="unitAmount">
                          <div class="priceTitle d-flex justify-content-space-around w-100">
                              <span>جنية</span>
                              <span>قرش</span>
                              
                          </div>
                          <div class="priceValue">
                            <span class="whitespace-lg border mx-2 text-center gray">15500</span>
                            <span class="whitespace border mx-2 text-center gray">75</span>
                              
                          </div>
                      </div>
                      
                  </div>
                </div>


                <div className="UnitRow">
                  <div className="unitName">
                    <p>Received from Mr/Ms/Mrs</p>
                    <p className="actualName">محمد أشرف حسن محمد نبهان</p>
                    <p>استلمنا من السيد/السيدة/السادة</p>
                  </div>
                </div>



                <div className="UnitRow">
                  <div className="unitTotPrice">
                    <p>The Sum of</p>
                    <p className="actualName">خمسة وسبعون الف جنية</p>
                    <p>مبلغ وقدره</p>
                  </div>
                </div>

                <div className="UnitRow">
                  <div className="payMethod">
                    <div className="methodunit">

                      <div className="methodTitle">
                        <p>Cash/Cheque No.</p>
                        <p>نقداً/شيك رقم </p>
                      </div>

                      <p>12345678910123</p>


                    </div>

                    <div className="methodunit">

                      <div className="methodTitle">
                        <p>Bank</p>
                        <p> بنك </p>
                      </div>

                      <p>بنك الراجحى</p>


                    </div>

                    <div className="methodunit">

                      <div className="methodTitle">
                        <p>Date</p>
                        <p>التاريخ</p>
                      </div>

                      <p> 12 / 11 / 1992 </p>

                    </div>
                  </div>
                </div>


                <div className="UnitRow">
                  <div className="beingFor">
                    <p>Being for</p>
                    <div className="beingtitle">
                      <p>صك ببرج هاجر </p>
                      <span>..............................................................</span>
                    </div>

                    <p>وذلك عن</p>
                  </div>
                </div>


                <div className="UnitRow">
                  <div className="unitSignture">
                    <div>
                      <h4>Received from Mr/Ms/Mrs</h4>
                      <span>................................................................</span>
                    </div>


                    <div>
                      <h4>استلمنا من السيد/السيدة/السادة</h4>
                      <span>....................................................................</span>
                    </div>
                    
                  </div>
                </div>

                


                {/* <div className="UnitRow">
                    <div className="unitDet">
                    <label className="filter-lable">Client</label>
                    <p>{data?.client_name}</p>
                    </div>

                    <div className="unitDet">
                      <label className="filter-lable">Created By</label>
                      <p>{data?.creator}</p>
                    </div>

                    <div className="unitDet">
                      <label className="filter-lable">Amount</label>
                      <p>{data?.amount}</p>
                    </div>
                </div> */}


               


                {/* <div className="UnitRow">
                    <div className="unitDet">
                      <label className="filter-lable">Payment Type</label>
                      <p>{data?.payment_type}</p>
                    </div>

                    <div className="unitDet">
                      <label className="filter-lable">Payment Method</label>
                      <p>{data?.payment_method}</p>
                    </div>

                    <div className="unitDet">
                      <label className="filter-lable">Status</label>
                      <p>{data?.status_text}</p>
                    </div>
                </div>

                <div className="UnitRow">
                    <div className="unitDet">
                      <label className="filter-lable">Created At</label>
                      <p>{data?.created_at}</p>
                    </div>

                    <div className="unitDet">
                      <label className="filter-lable">Notes</label>
                      <p>{data?.notes}</p>
                    </div>

                    <div className="unitDet">
                        <h4></h4>
                        <p></p>
                    </div>
                </div> */}

                
            </div>


            <div className="attachments attachmentDet">
                <h2 className="my-3">Attachments</h2>
                {data?.attachments?.length > 0 ? (
                    <div className="row info-box py-4">
                    {data?.attachments?.map((doc, i) => (
                        <div className="col-3" onClick={() => ShowAttach(i)}>
                        <img
                            src={doc?.file}
                            className="img-fluid w-100"
                            style={{ objectFit: "cover", cursor: "pointer" }}
                        />
                        <p className="doc mt-2">{doc.attachment_path}</p>
                        </div>
                    ))}
                    </div>
                ) : (
                    <p className="text-center">There is no attachments!</p>
                )}
            </div>


            
           

        </div>
    </>
  )

}




export default StatmentDetails;






















































