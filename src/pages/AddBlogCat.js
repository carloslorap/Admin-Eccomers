import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  createBlogCategory,
  getBlogCategory,
  resetState,
  updateBlogCategory,
} from "../features/bcategory/bcategorySlice";

const AddBlogCat = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation(); 
  const getBCatId = location.pathname.split("/")[3];
  const newBlogCategory = useSelector((state) => state.bCategory);

  const { isSuccess, isError, isLoading, createdBlogCategory ,blogCatName,updateABlogCat} =
    newBlogCategory;

    useEffect(() => {
      if (getBCatId !== undefined) {
        dispatch(getBlogCategory(getBCatId));
        formik.values.title = blogCatName;
      } else {
        dispatch(resetState());
      }
    }, [getBCatId]);


  useEffect(() => {
    if (isSuccess && createdBlogCategory) {
      toast.success("Blog Category Added successfully!");
    }
    if (updateABlogCat && isSuccess) {
      toast.success("Blog Category Updated successfully!");
     
    }
    if (isError) {
      toast.error("Something Went Wrong");
    }
  }, [isError, isLoading, isSuccess, createdBlogCategory,updateABlogCat]);

  let schema = Yup.object().shape({
    title: Yup.string().required("Blog Category Name is required"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: blogCatName || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getBCatId !== undefined) {
        const data = { id: getBCatId, catData: values };
        dispatch(updateBlogCategory(data))
      }else{
        dispatch(createBlogCategory(values));
        formik.resetForm();
      }
      setTimeout(() => {
        dispatch(resetState());
        navigate("/admin/blog-cat-list");
      }, 2000);
    },
  });
  return (
    <div>
      <h3 className="mb-4">{getBCatId !== undefined ? "Edit" : "Add"} Blog Category</h3>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Enter Blog Category"
            name="title"
            id="title"
            onCh={formik.handleChange("title")}
            val={formik.values.title}
          />
          <div className="error">
            {formik.touched.title && formik.errors.title ? (
              <div>{formik.errors.title}</div>
            ) : null}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {getBCatId !== undefined ? "Edit" : "Add"} Blog Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlogCat;
