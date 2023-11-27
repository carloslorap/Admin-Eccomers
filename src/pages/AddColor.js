import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createColor, getColor, resetState, updateColor } from "../features/color/colorSlice";

const AddColor = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const getColorId = location.pathname.split("/")[3];
  const newColor = useSelector((state) => state?.color);

  const { isSuccess, isError, isLoading, createdColor,updateAColor ,colorName} = newColor;

  useEffect(() => {
    if (getColorId !== undefined) {
      dispatch(getColor(getColorId));
      formik.values.title = colorName;
    } else {
      dispatch(resetState());
    }
  }, [getColorId]);


  useEffect(() => {
    if (isSuccess && createdColor) {
      toast.success("Color Added successfully!");
    }
    if (updateAColor && isSuccess) {
      toast.success("Color Updated successfully!");
     
    }
    if (isError) {
      toast.error("Something Went Wrong"); 
    }
  }, [isSuccess, isError, isLoading, createdColor, updateAColor]);

  let schema = Yup.object().shape({
    title: Yup.string().required("Color is required"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: colorName || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getColorId !== undefined) {
        //el colorData lo encuentras en el "colorSlice en la funcion de createdColor"
        const data = { id: getColorId, colorData: values };
        dispatch(updateColor(data));
      } else {
        dispatch(createColor(values));
        formik.resetForm();
      }

      setTimeout(() => {
        dispatch(resetState());
        navigate("/admin/list-color");
      }, 2000);
    },
  });

  return (
    <div>
      <h3 className="mb-4">{getColorId !== undefined ? "Edit" : "Add"} Color</h3>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <CustomInput
            type="color"
            label="Enter Color"
            name="title"
            id="title"
            onCh={formik.handleChange("title")}
            val={formik.values?.title}
          />
          <div className="error">
            {formik.touched?.title && formik.errors?.title ? (
              <div>{formik.errors?.title}</div>
            ) : null}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {getColorId !== undefined ? "Edit" : "Add"} Color
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddColor;
