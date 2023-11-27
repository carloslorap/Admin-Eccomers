import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getOrderByUser } from "../features/auth/authSlice";
import { Link, useLocation } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
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
    title: "Count",
    dataIndex: "count",
  },

  {
    title: "Price",
    dataIndex: "price",
  },
  {
    title: "Date",
    dataIndex: "date",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];
const ViewOrder = () => {
  const location = useLocation();
  const userId = location.pathname.split("/")[3];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrderByUser(userId));
  }, []);

  const orderState = useSelector((state) => state.auth.orderbyuser[0].products);
  console.log(orderState);
    const data1 = [];

    for (let i = 0; i < orderState.length; i++) {
      data1.push({
        key: i + 1,
        name: orderState[i].product.title,
        count: orderState[i].count,
        price: orderState[i].product.price,
        date: new Date(orderState[i].product.createdAt).toLocaleString(),
        action: (
          <>
            <Link>
              <BiEdit className="fs-5" />
            </Link>
            <Link className="text-danger ms-3 fs-5">
              <AiFillDelete />
            </Link>
          </>
        ),
      });
    }
  return (
    <div>
      <h3 className="mb-4">View Order </h3>
      <div> <Table columns={columns} dataSource={data1} /></div>
    </div>
  );
};

export default ViewOrder;
