import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { deleteCoupon, getCoupons } from "../features/coupon/couponSlice";
import CustomModal from "../components/CustomModal";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
const CouponList = () => {

  const [open, setOpen] = useState(false);
  const [couponId, setcouponId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setcouponId(e);
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
        title: "Discount",
        dataIndex: "discount",
      },
      {
        title: "Expiry",
        dataIndex: "expiry",
      },
    {
      title: "Action",
      dataIndex: "action",
    },
  ];

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCoupons());
  }, []);
  const couponState = useSelector((state) => state.coupon.coupons);

  const deletedACoupon = (e) => {

    dispatch(deleteCoupon(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getCoupons());
    }, 100);
    toast.success("Delete coupon successfully")
  };

  const data1 = [];
  for (let i = 0; i < couponState.length; i++) {
    data1.push({
      key: couponState[i]._id,
      name: couponState[i].name,
      discount: couponState[i].discount,
      expiry:  new Date(couponState[i].expiry).toLocaleString(),
      action: (
        <>
          <Link to={`/admin/add-coupon/${couponState[i]._id}`}>
            <BiEdit className="fs-5" />
          </Link>
          <button
            className="text-danger ms-3 fs-5 border-0 bg-transparent"
            onClick={() => showModal(couponState[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }

  return (
    <div>
      <h3 className="mb-4">Coupon</h3>
      <div>
        {" "}
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        performAction={() => {
          deletedACoupon(couponId);
        }}
        open={open}
        title="Are you sure you want to delete this coupon?"
      />
    </div>
  );
};

export default CouponList;
