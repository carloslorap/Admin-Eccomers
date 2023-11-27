import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Enquiries from "./pages/Enquiries";
import ViewEnq from "./pages/ViewEnq";
import BlogList from "./pages/BlogList";
import BlogCatList from "./pages/BlogCatList";
import Orders from "./pages/Orders";
import ViewOrder from "./pages/ViewOrder";
import Customers from "./pages/Customers";
import ColorList from "./pages/ColorList";
import CategoryList from "./pages/CategoryList";
import BrandList from "./pages/BrandList";
import ProductList from "./pages/ProductList";
import AddBlog from "./pages/AddBlog";
import AddBlogCat from "./pages/AddBlogCat";
import AddColor from "./pages/AddColor";
import AddCat from "./pages/AddCat";
import AddBrand from "./pages/AddBrand"; 
import AddProduct from "./pages/AddProduct";
import CouponList from "./pages/CouponList";
import AddCoupon from "./pages/AddCoupon";
import MainLayout from "./components/MainLayout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/admin" element={<MainLayout />} >
          <Route index element={<Dashboard/>}/>
          <Route path="enquiries" element={<Enquiries/>}/>
          <Route path="enquiries/:id" element={<ViewEnq/>}/>
          <Route path="blog-list" element={<BlogList/>}/>
          <Route path="blog-cat-list" element={<BlogCatList/>}/>
          <Route path="orders" element={<Orders/>}/>
          <Route path="orders/:id" element={<ViewOrder/>}/>
          <Route path="customers" element={<Customers/>}/>
          <Route path="list-color" element={<ColorList/>}/>
          <Route path="list-category" element={<CategoryList/>}/>
          <Route path="list-brand" element={<BrandList/>}/>
          <Route path="list-coupon" element={<CouponList/>}/>
          <Route path="product-list" element={<ProductList/>}/>
          <Route path="add-blog" element={<AddBlog/>}/>
          <Route path="add-blog/:id" element={<AddBlog/>}/>
          <Route path="add-blog-cat" element={<AddBlogCat/>}/>
          <Route path="add-blog-cat/:id" element={<AddBlogCat/>}/>
          <Route path="add-color" element={<AddColor/>}/>
          <Route path="add-color/:id" element={<AddColor/>}/>
          <Route path="add-category" element={<AddCat/>}/>
          <Route path="add-category/:id" element={<AddCat/>}/>
          <Route path="add-brand" element={<AddBrand/>}/>
          <Route path="add-brand/:id" element={<AddBrand/>}/>
          <Route path="add-product" element={<AddProduct/>}/>
          <Route path="add-coupon" element={<AddCoupon/>}/>
          <Route path="add-coupon/:id" element={<AddCoupon/>}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
