import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete,AiOutlineEye } from "react-icons/ai";
import { deleteEnquiry, getEnquiries, updateEnquiry } from "../features/enquiry/enquirySlice";
import CustomModal from "../components/CustomModal";
import { toast } from "react-toastify";
const Enquiries = () => {

  const [open, setOpen] = useState(false);
  const [enqdId, setenqdId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setenqdId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };

  const columns = [
    {
      title: "Nro",
      dataIndex: "key",
    },
    { 
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
  
    {
      title: "Mobile",
      dataIndex: "mobile",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Action",
      dataIndex: "action",
    },
  
  ];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getEnquiries());
  }, []);
  const enqState = useSelector((state) => state.enquiry.enquiries);

  const deletedAEnq = (e) => {

    dispatch(deleteEnquiry(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getEnquiries());
    }, 100);
    toast.success("Delete Enquiry successfully")
  };

  const data1 = [];
  for (let i = 0; i < enqState.length; i++) {
    data1.push({
      key: enqState[i]._id,
      name: enqState[i].name,
      email: enqState[i].email,
      mobile: enqState[i].mobile,
      status: (
        <>
          <select
              defaultValue={enqState[i].status ? enqState[i].status : "Submitted"}
              className="form-control form-select"
              onChange={(e)=>setEnquiryStatus(e.target.value,enqState[i]._id)}
            >
              <option value="Submitted">Submitted</option>
              <option value="Contacted">Contacted</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
        </>
      ),
      
      action: (
        <>
           <Link className="ms-1 fs-5" to={`/admin/enquiries/${enqState[i]._id}`}>
            <AiOutlineEye />
          </Link>
          <button
            className="text-danger ms-2 fs-5 border-0 bg-transparent"
            onClick={() => showModal(enqState[i]._id)}
          >
            <AiFillDelete />
          </button>
     
     
        </>
      ),
    });
  }
  const setEnquiryStatus=(e,i)=>{
    const data={id:i,enqData:e}
    dispatch(updateEnquiry(data))
  }
  return (
    <div>
      <h3 className="mb-4">Enquiries</h3>
      <div>
        {" "}
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        performAction={() => {
          deletedAEnq(enqdId);
        }}
        open={open}
        title="Are you sure you want to delete this Enquiry?"
      />
    </div>
  );
};

export default Enquiries;
