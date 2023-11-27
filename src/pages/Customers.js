import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../features/customers/customerSlice";

const Customers = () => {
  const columns = [
    {
      title: "Nro",
      dataIndex: "key",
    },
    {
      title: "Name",
      dataIndex: "firstname",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
    },
  ];


  
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getUsers())
  },[])
  const customerstate =useSelector((state)=>state.customer.customers)
  const data1 = [];

  for (let i = 0; i < customerstate.length; i++) {
    if(customerstate[i].role !== "admin"){
      data1.push({
        key:customerstate[i]._id,
        firstname: customerstate[i].firstname + " "+ customerstate[i].lastname,
        email: customerstate[i].email,
        mobile: customerstate[i].mobile,
      });
    }
  }
  


return ( <div>


      <h3 className="mb-4">Customers </h3>
      <div>
        {" "}
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default Customers;