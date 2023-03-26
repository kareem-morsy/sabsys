import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import fetcher from "../../../../Services/fetcher";
import { Modal, Button } from "react-bootstrap";

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
            <div className="statementDet">

                <h1>Statment Details</h1>
                <div className="UnitRow">
                    <div className="unitDet">
                        <h4></h4>
                        <p></p>
                    </div>

                    <div className="unitDet">
                        <h4></h4>
                        <p></p>
                    </div>

                    <div className="unitDet">
                        <h4></h4>
                        <p></p>
                    </div>
                </div>


                <div className="UnitRow">
                    <div className="unitDet">
                        <h4></h4>
                        <p></p>
                    </div>

                    <div className="unitDet">
                        <h4></h4>
                        <p></p>
                    </div>

                    <div className="unitDet">
                        <h4></h4>
                        <p></p>
                    </div>
                </div>

                <div className="UnitRow">
                    <div className="unitDet">
                        <h4></h4>
                        <p></p>
                    </div>

                    <div className="unitDet">
                        <h4></h4>
                        <p></p>
                    </div>

                    <div className="unitDet">
                        <h4></h4>
                        <p></p>
                    </div>
                </div>

                
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
