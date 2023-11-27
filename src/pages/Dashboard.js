import React from "react";
import { BsArrowDownRight } from "react-icons/bs";
import { Column } from "@ant-design/plots";

import { Table } from "antd";
import GraficCircle from "../components/GraficCircle";

const Dashboard = () => {

  const columns = [
    {
      title: "Nro",
      dataIndex: "key",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Product",
      dataIndex: "product",
    },
    {
      title: "Status",
      dataIndex: "staus",
    }, 
  ];
  const data1 = [];
  for (let i = 0; i < 46; i++) {
    data1.push({
      key: i,
      name: `Edward King ${i}`,
      product: `London, Park Lane no. ${i}`,
      staus: `peding ${i}`,
    });
  }

  
  const data = [
    {
      type: "Jan",
      sales: 38,
    },
    {
      type: "Feb",
      sales: 52,
    },
    {
      type: "Mar",
      sales: 61,
    },
    {
      type: "Apr",
      sales: 145,
    },
    {
      type: "May",
      sales: 48,
    },
    {
      type: "Jun",
      sales: 38,
    },
    {
      type: "July",
      sales: 97,
    },
    {
      type: "Aug",
      sales: 38,
    },
    {
      type: "Sept",
      sales: 120,
    },
    {
      type: "Oct",
      sales: 38,
    },
    {
      type: "Nov",
      sales: 38,
    },
    {
      type: "Dec",
      sales: 100,
    },
  ];
  const config = {
    data,
    xField: "type",
    yField: "sales",

    label: {
      position: "middle",

      style: {
        fill: "#FFFFFF",
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Month",
      },
      sales: {
        alias: "Income ",
      },
    },
  };



  return (
    <div>
      <h3>Dashboard</h3>
      <div className="d-flex justify-content-between align-items-center gap-3">
        <div className="d-flex justify-content-between align-items-end bg-white flex-grow-1 p-3 rounded-3">
          <div>
            <p className="mb-0">total</p> <h4 className="mb-0">$100</h4>
          </div>{" "}
          <div className="d-flex flex-column justify-content-end align-items-end">
            <h6>
              <BsArrowDownRight /> 32%
            </h6>
            <p className="mb-0">Compare to April</p>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-end bg-white flex-grow-1 p-3 rounded-3">
          <div>
            <p className="mb-0">total</p> <h4 className="mb-0">$100</h4>
          </div>{" "}
          <div className="d-flex flex-column justify-content-end align-items-end">
            <h6 className="red">
              <BsArrowDownRight /> 32%
            </h6>
            <p className="mb-0">Compare to April</p>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-end bg-white flex-grow-1 p-3 rounded-3">
          <div>
            <p className="mb-0">total</p> <h4 className="mb-0">$100</h4>
          </div>{" "}
          <div className="d-flex flex-column justify-content-end align-items-end">
            <h6 className="green">
              <BsArrowDownRight /> 32%
            </h6>
            <p className="mb-0">Compare to April</p>
          </div>
        </div>
      </div>

     <div className="d-flex gap-3 justify-content-between">
     <div className="mt-4 w-50 flex-grow-1">
        <h3 className="mb-4 ">Income Statics</h3>
        <br />
        <div>
          <Column {...config} />
        </div>
      </div>
    <GraficCircle/>
     </div>

     <br />
      <div className="mt-4 ">
        <h3 className="mb-4">Recent Orders</h3>
        <br />
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
