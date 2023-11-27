import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Dropzone from "react-dropzone";
import { delImg, uploadImg } from "../features/upload/uploadSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getBlogCategories } from "../features/bcategory/bcategorySlice";
import {
  createBlog,
  getBlog,
  resetState,
  updateBlog,
} from "../features/blogs/blogSlice";

const AddBlog = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const getBlogId = location.pathname.split("/")[3];

  const imgState = useSelector((state) => state.upload.images);
  const bCatState = useSelector((state) => state.bCategory.bCategories);
  const newBlog = useSelector((state) => state.blog);
  const {
    isSuccess,
    isError,
    isLoading,
    createdBlog,
    BlogName,
    BlogDesc,
    BlogCategory,
    Blogimages,
    updateABlog,
  } = newBlog;

  useEffect(() => {
    if (getBlogId !== undefined) {
      dispatch(getBlog(getBlogId));
     img.push(Blogimages)
    } else {
      dispatch(resetState());
    }
  }, [getBlogId]);
 
  useEffect(() => {
    if (isSuccess && createdBlog) {
      toast.success("Blog Added successfully!");
    }
    if (isSuccess && updateABlog) {
      toast.success("Blog Updated successfully!");
    }
    if (isError) {
      toast.error("Something Went Wrong");
    }
  }, [isSuccess, isError, isLoading, createdBlog, updateABlog]);

  const img = [];
  imgState.forEach((i) => {
    img.push({
      public_id: i.public_id,
      url: i.url,
    });
  });

  useEffect(() => {
    dispatch(getBlogCategories());
  }, []);
  useEffect(() => {
    formik.values.images = img;
  }, [img]);

  let schema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    category: Yup.string().required("Category is required"),
  });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: BlogName || "",
      description: BlogDesc || "",
      category: BlogCategory || "",
      images: Blogimages || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getBlogId !== undefined) {
        const data = { id: getBlogId, blogData: values };
        dispatch(updateBlog(data));
      } else {
        dispatch(createBlog(values));
        formik.resetForm();
      }

      setTimeout(() => {
        dispatch(resetState());
        navigate("/admin/blog-list");
      }, 2000);
    },
  });

  return (
    <div>
      <h3 className="mb-4">{getBlogId !== undefined ? "Edit" : "Add"} Blog</h3>

      <div>
        <form onSubmit={formik.handleSubmit}>
          {/* <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload. Strictly prohibited from
              uploading company data or other banned files.
            </p>
          </Dragger> */}
          <div className="mt-3 ">
            <CustomInput
              type="text"
              label="Enter Blog Title"
              name="title"
              id="title"
              onCh={formik.handleChange("title")}
              val={formik.values.title}
            />
          </div>
          <div className="error">
            {formik.touched.title && formik.errors.title ? (
              <div>{formik.errors.title}</div>
            ) : null}
          </div>
          <select
            className="form-control py-3 mt-3"
            id="category"
            name="category"
            onChange={formik.handleChange("category")}
            value={formik.values.category}
          >
            <option>Select Blog Category</option>

            {bCatState.map((i) => {
              return <option value={i.title}>{i.title}</option>;
            })}
          </select>
          <div className="error">
            {formik.touched.category && formik.errors.category ? (
              <div>{formik.errors.category}</div>
            ) : null}
          </div>
          <ReactQuill
            theme="snow"
            className="mt-3"
            name="description"
            onChange={formik.handleChange("description")}
            onBlur={() => formik.handleBlur("description")}  
            value={formik.values.description}
          />
          <div className="error">
            {formik.touched.description && formik.errors.description ? (
              <div>{formik.errors.description}</div>
            ) : null}
          </div>
          <div className="bg-white border-1 p-5 text-center mt-3">
            <Dropzone
              onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
          <div className="showimages mt-3 d-flex flex-wrap gap-3">
            {imgState.map((i, j) => {
              return (
                <div key={j} className="position-relative">
                  <button
                    type="button"
                    className="btn-close position-absolute"
                    style={{ top: "10px", right: "10px" }}
                    onClick={() => dispatch(delImg(i.public_id))}
                  ></button>
                  <img src={i.url} alt="" width={200} height={200} />
                </div>
              );
            })}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {getBlogId !== undefined ? "Edit" : "Add"} Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
