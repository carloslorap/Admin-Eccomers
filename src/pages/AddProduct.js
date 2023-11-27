import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import CustomInput from "../components/CustomInput";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { getAllBrands } from "../features/brand/brandSlice";
import { getCategories } from "../features/pcategory/pcategorySlice";
import { toast } from "react-toastify";
// import Multiselect from "react-widgets/Multiselect";
// import "react-widgets/styles.css";
import { Select } from "antd";
import { getColors } from "../features/color/colorSlice";
import Dropzone from "react-dropzone";
import { delImg, uploadImg } from "../features/upload/uploadSlice";
import { createProducts, resetState } from "../features/product/productSlice";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [color, setcolor] = useState([]);
  const [images, setimages] = useState([]);

  useEffect(() => {
    dispatch(getAllBrands());
    dispatch(getCategories());
    dispatch(getColors());
  }, []);

  const brandState = useSelector((state) => state.brand.brands);
  const pCatState = useSelector((state) => state.pCategory.pCategories);
  const colorState = useSelector((state) => state.color.colors);
  const imgState = useSelector((state) => state.upload.images);
  const newProduct = useSelector((state) => state.product);

  const { isSuccess, isError, isLoading, createProduct } = newProduct;
  useEffect(() => {
    if (isSuccess && createProduct) {
      toast.success("Product Added successfully!");
    }
    if (isError) {
      toast.error("Something Went Wrong");
    }
  }, [isSuccess, isError, isLoading, createProduct]);

  const coloropt = []; 
  colorState.forEach((i) => {
    coloropt.push({
      value: i._id,
      label: (<>
       <p className="d-flex align-items-center gap-1 mb-0">
            <p className="mb-0 titulo-color">{i.title}</p>
            <ul className="colors-1 ps-0 mb-0">
              <li style={{ backgroundColor: i.title }}></li>
            </ul>
          </p>
      </>),
     
    });
  });

  const img = [];
  imgState?.forEach((i) => {
    img.push({
      public_id: i.public_id,
      url: i.url,
    });
  });
  useEffect(() => {
    formik.values.color = color ? color : "";
    formik.values.images = img;
  }, [color, img]);

  const handleColors = (e) => {
    setcolor(e);
  };
  let schema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    price: Yup.number().required("Price is required"),
    brand: Yup.string().required("Brand is required"),
    category: Yup.string().required("Category is required"),
    tags: Yup.string().required("Tag is required"),
    color: Yup.array()
      .min(1, "Pick at least one color")
      .required("Colors are required"),
    quantity: Yup.number().required("Quantity is required"),
  });
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: "",
      brand: "",
      category: "",
      tags: "",
      color: "",
      quantity: "",
      images: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createProducts(values));
      formik.resetForm();
      setcolor(null);
      setTimeout(() => {
        dispatch(resetState());
        navigate("/admin/product-list");
      }, 2000);
    },
  });

  return (
    <div>
      <h3 className="mb-4">Add Product</h3>
      <form onSubmit={formik.handleSubmit}>
        <CustomInput
          type="text"
          label="Enter Blog Title"
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
        <div className=" mt-3">
          <ReactQuill
            theme="snow"
            name="description"
            onChange={formik.handleChange("description")}
            onBlur={() => formik.handleBlur("description")}  
            value={formik.values.description}
          />
        </div>
        <div className="error">
          {formik.touched.description && formik.errors.description ? (
            <div>{formik.errors.description}</div>
          ) : null}
        </div>
        <CustomInput
          type="number"
          label="Enter Blog Title"
          name="price"
          id="price"
          onCh={formik.handleChange("price")}
          val={formik.values.price}
        />
        <div className="error">
          {formik.touched.price && formik.errors.price ? (
            <div>{formik.errors.price}</div>
          ) : null}
        </div>
        <select
          className="form-control py-3 mt-3"
          name="brand"
          id="brand"
          onChange={formik.handleChange("brand")}
          value={formik.values.brand}
        >
          <option>Select Brand</option>
          {brandState.map((i) => {
            return <option value={i.title}>{i.title}</option>;
          })}
        </select>
        <div className="error">
          {formik.touched?.brand && formik.errors.brand ? (
            <div>{formik.errors.brand}</div>
          ) : null}
        </div>
        <select
          className="form-control py-3 mt-3"
          name="category"
          id="category"
          onChange={formik.handleChange("category")}
          value={formik.values.category}
        >
          <option>Select Category</option>
          {pCatState.map((i) => {
            return <option value={i.title}>{i.title}</option>;
          })}
        </select>
        <div className="error">
          {formik.touched.category && formik.errors.category ? (
            <div>{formik.errors.category}</div>
          ) : null}
        </div>
        <select
          className="form-control py-3 mt-3"
          name="tags"
          id="tags"
          onChange={formik.handleChange("tags")}
          value={formik.values.tags}
        >
          <option value="addtag">Add Tag</option>
          <option value="featured">Featured</option>
          <option value="popular">Popular</option>
          <option value="special">Special</option>
        </select>
        <div className="error">
          {formik.touched.tags && formik.errors.tags ? (
            <div>{formik.errors.tags}</div>
          ) : null}
        </div>

        <Select
          mode="multiple"
          allowClear
          className="w-100 py-3  mt-3"
          placeholder="Select Colors"
          defaultValue={color}
          onChange={(i) => handleColors(i)}
          options={coloropt}
        />
        <div className="error">
          {formik.touched.color && formik.errors.color ? (
            <div>{formik.errors.color}</div>
          ) : null}
        </div>
        <CustomInput
          type="number"
          label="Enter Product Quantity"
          name="quantity"
          id="quantity"
          onCh={formik.handleChange("quantity")}
          val={formik.values.quantity}
        />
        <div className="error">
          {formik.touched.quantity && formik.errors.quantity ? (
            <div>{formik.errors.quantity}</div>
          ) : null}
        </div>

        <div className="bg-white border-1 p-5 text-center mt-3">
          <Dropzone
            onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}
            multiple
          >
            {({ getRootProps, getInputProps }) => (
              <div>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p>Drag 'n' drop some files here, or click to select files</p>
                </div>
              </div>
            )}
          </Dropzone>
        </div>
        <div className="showimages d-flex flex-wrap gap-3 mt-3">
          {imgState && imgState?.map((i, j) => {
            return (
              <div className="position-relative" key={j}>
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
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
