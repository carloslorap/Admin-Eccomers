import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { deleteProductCategory, getCategories } from "../features/pcategory/pcategorySlice";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import CustomModal from "../components/CustomModal";
import { toast } from "react-toastify";
const CategoryList = () => {

  const [open, setOpen] = useState(false);
  const [categoryId, setcategoryId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setcategoryId(e);
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
      dataIndex: "title",
    },
    
    {
      title: "Action",
      dataIndex: "action",
    },
  ];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const deleteaProductCategory = (e) => {

    dispatch(deleteProductCategory(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getCategories());
    }, 100);
    toast.success("Delete category successfully")
  };

  const pCatState = useSelector((state) => state.pCategory.pCategories);

  const data1 = [];
  for (let i = 0; i < pCatState.length; i++) {
    data1.push({
      key: pCatState[i]._id,
      title: pCatState[i].title,
  
      action: (
        <>
          <Link to={`/admin/add-category/${pCatState[i]._id}`}>
            <BiEdit className="fs-5"/>
          </Link>
          <button
            className="text-danger ms-3 fs-5 border-0 bg-transparent"
             onClick={() => showModal(pCatState[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }

  return (
    <div>
      <h3 className="mb-4">Category</h3>
      <div>
        {" "}
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        performAction={() => {
          deleteaProductCategory(categoryId);
        }}
        open={open}
        title="Are you sure you want to delete this category?"
      />
    </div>
  );
};

export default CategoryList;