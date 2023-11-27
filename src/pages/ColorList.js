import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { deleteColor, getColors } from "../features/color/colorSlice";
import CustomModal from "../components/CustomModal";
import { toast } from "react-toastify";

const ColorList = () => {
  const [open, setOpen] = useState(false);
  const [colorId, setcolorId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setcolorId(e);
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
      title: "Image",
      dataIndex: "image",
    },

    {
      title: "Status",
      dataIndex: "action",
    },
  ];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getColors());
  }, []);
  const colorState = useSelector((state) => state.color.colors);

  const data1 = [];
  for (let i = 0; i < colorState.length; i++) {
    data1.push({
      key: colorState[i]._id,
      title: colorState[i].title,
      image: (
        <>
          <p className="d-flex gap-2 mb-0">
            
            <ul className="colors ps-0">
              <li style={{ backgroundColor: colorState[i].title }}></li>
            </ul>
          </p>
        </>
      ),
      action: (
        <>
          <Link to={`/admin/add-color/${colorState[i]._id}`}>
            <BiEdit className="fs-5" />
          </Link>
          <button
            className="text-danger ms-3 fs-5 border-0 bg-transparent"
            onClick={() => showModal(colorState[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  const deletedAColor = (e) => {
    dispatch(deleteColor(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getColors());
    }, 100);
    toast.success("Delete color successfully");
  };
  return (
    <div>
      <h3 className="mb-4">Color</h3>
      <div>
        {" "}
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        performAction={() => {
          deletedAColor(colorId);
        }}
        open={open}
        title="Are you sure you want to delete this color?"
      />
    </div>
  );
};

export default ColorList;
