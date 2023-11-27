import React, { useEffect, useState } from 'react'
import { Table } from "antd";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import { deleteBlogCategory, getBlogCategories } from '../features/bcategory/bcategorySlice';
import CustomModal from '../components/CustomModal';
import { toast } from 'react-toastify';

const BlogCatList = () => {

  const [open, setOpen] = useState(false);
  const [bCatId, setbCatId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setbCatId(e);
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
          title: "Status",
          dataIndex: "action",
        },
      ];
      const dispatch = useDispatch();
      useEffect(() => {
        dispatch(getBlogCategories());
      }, []);
      const bCatState = useSelector((state) => state.bCategory.bCategories);

      const deletedABlogCat = (e) => {

        dispatch(deleteBlogCategory(e));
        setOpen(false);
        setTimeout(() => {
          dispatch(getBlogCategories());
        }, 100);
        toast.success("Delete Blog Category successfully")
      };
    
    
      const data1 = [];
      for (let i = 0; i < bCatState.length; i++) {
        data1.push({
          key: bCatState[i]._id,
          title: bCatState[i].title,
      
          action: (
            <>
              <Link to={`/admin/add-blog-cat/${bCatState[i]._id}`}>
                <BiEdit className="fs-5"/>
              </Link>
              <button
            className="text-danger ms-3 fs-5 border-0 bg-transparent"
            onClick={() => showModal(bCatState[i]._id)}
          >
            <AiFillDelete />
          </button>
            </>
          ),
        });
      }

  return (
   <div>
      <h3 className="mb-4">Blog Categories </h3>
      <div>
        {" "}
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        performAction={() => {
          deletedABlogCat(bCatId);
        }}
        open={open}
        title="Are you sure you want to delete this Blog Category?"
      />
    </div>
  )
}

export default BlogCatList