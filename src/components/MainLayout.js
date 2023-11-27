import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import {
  AiOutlineDashboard,
  AiOutlineShoppingCart,
  AiOutlineUser,
  AiOutlineBgColors,
} from "react-icons/ai";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Outlet } from "react-router-dom";
import { BiSolidCartAdd, BiListUl, BiSolidCategory } from "react-icons/bi";
import { IoIosNotifications } from "react-icons/io";
import { SiBrandfolder } from "react-icons/si";
import { RiAddLine,RiCoupon2Fill } from "react-icons/ri";
import { FaBlogger, FaClipboardList } from "react-icons/fa"; 
import { MdOutlineQuiz } from "react-icons/md";
import { ImBlog } from "react-icons/im";
import { Layout, Menu, Button, theme } from "antd";
import { useNavigate } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const navigate = useNavigate();
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical">
          <h2 className="text-white fs-5 text-center py-4 mb-0 ">
            <span className="sm-logo">XF</span>
            <span className="lg-logo">X-forces</span>
          </h2>
        </div>

        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          onClick={({ key }) => {
            if (key === "signout") {
            } else {
              navigate(key);
            }
          }}
          items={[
            {
              key: "/admin",
              icon: <AiOutlineDashboard className="fs-5" />,
              label: "Dashboard",
            },
            {
              key: "customers",
              icon: <AiOutlineUser className="fs-5" />,
              label: "Customers",
            },
            {
              key: "Catalog",
              icon: <AiOutlineShoppingCart className="fs-5" />,
              label: "Catalog",
              children: [
                {
                  key: "product",
                  icon: <BiSolidCartAdd className="fs-5" />,
                  label: "Product",
                  children: [
                    {
                      key: "product-list",
                      icon: <BiListUl className="fs-5" />,
                      label: "Product List",
                    },
                    {
                      key: "add-product",
                      icon: <RiAddLine className="fs-5" />,
                      label: "Add Product",
                    },
                  ],
                },

                {
                  key: "brand",
                  icon: <SiBrandfolder className="fs-5" />,
                  label: "Brand",
                  children: [
                    {
                      key: "list-brand",
                      icon: <BiListUl className="fs-5" />,
                      label: "Brand List",
                    },
                    {
                      key: "add-brand",
                      icon: <RiAddLine className="fs-5" />,
                      label: "Add Brand",
                    },
                  ],
                },

                {
                  key: "category",
                  icon: <BiSolidCategory className="fs-5" />,
                  label: "Category",
                  children: [
                    {
                      key: "list-category",
                      icon: <BiListUl className="fs-5" />,
                      label: "Category List",
                    },
                    {
                      key: "add-category",
                      icon: <RiAddLine className="fs-5" />,
                      label: "Add Category",
                    },
                  ],
                },

                {
                  key: "color",
                  icon: <AiOutlineBgColors className="fs-5" />,
                  label: "Color",
                  children: [
                    {
                      key: "list-color",
                      icon: <BiListUl className="fs-5" />,
                      label: "Color List",
                    },
                    {
                      key: "add-color",
                      icon: <RiAddLine className="fs-5" />,
                      label: "Add Color",
                    },
                  ],
                },
              ],
            },
            {
              key: "orders",
              icon: <FaClipboardList className="fs-5" />,
              label: "Ordes",
            },
            {
              key: "blog",
              icon: <FaBlogger className="fs-5" />,
              label: "Blogs",
              children: [
                {
                  key: "blog-list",
                  icon: <FaBlogger className="fs-5" />,
                  label: "Blog List",
                },
                {
                  key: "add-blog",
                  icon: <ImBlog className="fs-5" />,
                  label: "Add Blog",
                },

                {
                  key: "blog-cat-list",
                  icon: <FaBlogger className="fs-5" />,
                  label: "Blog Category List",
                },

                {
                  key: "add-blog-cat",
                  icon: <ImBlog className="fs-5" />,
                  label: "Add Blog Category",
                },
              ],
            },
            {
              key: "enquiries",
              icon: <MdOutlineQuiz className="fs-5" />,
              label: "Enquiries",
            },
            {
              key: "coupon",
              icon: <RiCoupon2Fill className="fs-5" />,
              label: "Coupon",
              children: [
                {
                  key: "list-coupon",
                  icon: <BiListUl className="fs-5" />,
                  label: "Coupon List",
                },
                {
                  key: "add-coupon",
                  icon: <RiAddLine className="fs-5" />,
                  label: "Add Coupon",
                },
              ],
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{ padding: 0, background: colorBgContainer }}
          className="d-flex justify-content-between ps-1 pe-5"
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <div className="d-flex gap-3 align-items-center dropdown show">
            <div className="position-relative">
              <IoIosNotifications className="fs-3" />
              <span className="badge bg-warning rounded-circle p-1 position-absolute">
                3
              </span>
            </div>
            <div className="d-flex gap-2 align-items-center">
              <div>
                <img
                  width={35}
                  height={35}
                  src="https://cdn.icon-icons.com/icons2/1161/PNG/512/1487716857-user_81635.png"
                  alt=""
                />
              </div>
              <div>
                <h5 className="mb-0">Navdeep</h5>
                <p className="mb-0">carloslorapuma@gmail.com</p>
              </div>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
           <ToastContainer 
           position="top-right"
           autoClose={1000}
           hideProgressBar={false}
           newestOnTop={true}
           closeOnClick
           rtl={false}
           pauseOnFocusLoss
           draggable
        
           theme="light"/>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
