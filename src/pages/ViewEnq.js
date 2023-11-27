import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { getEnquiry, resetState, updateEnquiry } from "../features/enquiry/enquirySlice";



const ViewEnq = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const getEnqId = location.pathname.split("/")[3];
  const dispatch = useDispatch();
  const enqState = useSelector((state) => state.enquiry);
  const { EnqName, EnqMobile, EnqEmail, EnqComment, EnqStatus } =
    enqState;

  useEffect(() => {
    dispatch(getEnquiry(getEnqId));
  }, [getEnqId]);

  const goBack = () => {
    navigate(-1);
  };
  const setEnquiryStatus = (e, i) => {
    const data = { id: i, enqData: e };
    dispatch(updateEnquiry(data));
   
    dispatch(resetState())
      setTimeout(() => {
        dispatch(getEnquiry(getEnqId))
      }, 100);

  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="mb-4">View Enquiry</h3>
        <button className="border-0 bg-transparent" onClick={goBack}>
          <IoIosArrowBack className="fs-5" /> Go Back
        </button>
      </div>
      <div className="mt-5 bg-white p-4 d-flex gap-3 flex-column rounded-3">
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Name:</h6>
          <p className="mb-0">{EnqName}</p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Mobile:</h6>
          <p className="mb-0">{EnqMobile}</p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Email:</h6>
          <p className="mb-0">{EnqEmail}</p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Comment:</h6>
          <p className="mb-0">{EnqComment}</p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Status:</h6>
          <p className="mb-0">{EnqStatus}</p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Change Status:</h6>
          <div>
            <select
              defaultValue={EnqStatus ? EnqStatus : "Submitted"}
              className="form-control form-select"
              onChange={(e) => setEnquiryStatus(e.target.value, getEnqId)}
            >
              <option value="Submitted">Submitted</option>
              <option value="Contacted">Contacted</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewEnq;
