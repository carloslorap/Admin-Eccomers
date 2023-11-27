import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createCategory, getProductCategory, resetState, updateProductCategory } from "../features/pcategory/pcategorySlice";

const AddCat = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch(); 
  const location = useLocation();
  const getpCatId = location.pathname.split("/")[3];
  const newCategory = useSelector((state) => state.pCategory);

  const {isSuccess, isError, isLoading, createdCategory,updatedCategory,categoryName } = newCategory;
  useEffect(() => {
    if (getpCatId !== undefined) {
      dispatch(getProductCategory(getpCatId));
      formik.values.title = categoryName;
    } else {
      dispatch(resetState());
    }
  }, [getpCatId]);
  useEffect(() => {
    if (isSuccess && createdCategory) {
      toast.success("Category Added successfully!");
    }
    if (updatedCategory && isSuccess) {
      toast.success("Category Updated successfully!");
     
    }
    if (isError) {
      toast.error("Something Went Wrong");
    }
  }, [isSuccess, isError, isLoading, createdCategory,updatedCategory]);

  let schema = Yup.object().shape({
    title: Yup.string().required("Category Name is required"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: categoryName || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getpCatId !== undefined) {
        const data = { id: getpCatId, categoryData: values };
        dispatch(updateProductCategory(data))
      }else{
        dispatch(createCategory(values));
        formik.resetForm();
      }
    
     
      setTimeout(() => {
        dispatch(resetState())
        navigate("/admin/list-category");
      }, 2000);
    },
  });
  return (
    <div>
      <h3 className="mb-4">{getpCatId !== undefined ? "Edit" : "Add"} Category</h3>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Enter Category"
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
            {getpCatId !== undefined ? "Edit" : "Add"} Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCat;
