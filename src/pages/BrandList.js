import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteBrand,
  getAllBrands,
} from "../features/brand/brandSlice";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import CustomModal from "../components/CustomModal";
import { toast } from "react-toastify";
const BrandList = () => {
  const [open, setOpen] = useState(false);
  const [brandId, setbrandId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setbrandId(e);
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
      title: "Action",
      dataIndex: "action",
    },
  ];

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllBrands());
  }, []);
  const brandState = useSelector((state) => state.brand.brands);

  const deletedABrand = (e) => {

    dispatch(deleteBrand(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getAllBrands());
    }, 100);
    toast.success("Delete brand successfully")
  };

  const data1 = [];
  for (let i = 0; i < brandState.length; i++) {
    data1.push({
      key: brandState[i]._id,
      name: brandState[i].title,

      action: (
        <>
          <Link to={`/admin/add-brand/${brandState[i]._id}`}>
            <BiEdit className="fs-5" />
          </Link>
          <button
            className="text-danger ms-3 fs-5 border-0 bg-transparent"
            onClick={() => showModal(brandState[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }

  return (
    <div>
      <h3 className="mb-4">Brand</h3>
      <div>
        {" "}
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        performAction={() => {
          deletedABrand(brandId);
        }}
        open={open}
        title="Are you sure you want to delete this brand?"
      />
    </div>
  );
};

export default BrandList;
