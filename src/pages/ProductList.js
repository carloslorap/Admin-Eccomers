import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../features/product/productSlice";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
const ProductList = () => {
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
      title: "Brand",
      dataIndex: "brand",
    },
    {
      title: "Color",
      dataIndex: "color",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Action",
      dataIndex: "action",
    },
  ];

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, []);
  const productState = useSelector((state) => state.product.products);

  const data1 = [];
  for (let i = 0; i < productState.length; i++) {
    data1.push({
      key: productState[i]._id,
      title: productState[i].title,
      price: `$ ${productState[i].price}`,
      category: productState[i].category,
      color: productState[i].color.map((i) => {
        return <p>{i.color}</p>
      }),
      brand: productState[i].brand,
      action: (
        <>
          <Link>
            <BiEdit className="fs-5"/>
          </Link>
          <Link className="text-danger ms-3 fs-5">
            <AiFillDelete />
          </Link>
        </>
      ),
    });
  }
  return (
    <div>
      <h3 className="mb-4">Products</h3>
      <div>
        {" "}
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default ProductList;
