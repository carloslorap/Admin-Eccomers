import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { deleteBlog, getBlogs } from "../features/blogs/blogSlice";
import CustomModal from "../components/CustomModal";
import { toast } from "react-toastify";

const BlogList = () => {
 
  const [open, setOpen] = useState(false);
  const [blogId, setblogId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setblogId(e);
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
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Action",
      dataIndex: "action",
    },
  ];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBlogs());
  }, []);
  const getBlogState = useSelector((state) => state.blog.blogs);

  const deletedABlog = (e) => {

    dispatch(deleteBlog(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getBlogs());
    }, 100);
    toast.success("Delete blog successfully")
  };

  const data1 = [];
  for (let i = 0; i < getBlogState.length; i++) {
    data1.push({
      key: getBlogState[i]._id,
      title: getBlogState[i].title,
      category: getBlogState[i].category,
      action: (
        <>
          <Link to={`/admin/add-blog/${getBlogState[i]._id}`}>
            <BiEdit className="fs-5"/>
          </Link>
          <button
            className="text-danger ms-3 fs-5 border-0 bg-transparent"
            onClick={() => showModal(getBlogState[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  return (
    <div>
      <h3 className="mb-4">Blog List</h3>
      <div>
        {" "}
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        performAction={() => {
          deletedABlog(blogId);
        }}
        open={open}
        title="Are you sure you want to delete this blog?"
      />
    </div>
  );
};

export default BlogList;
