import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "../components/Home";
import Products from "../components/Products";
import Stocks from "../components/Stocks";
import Logs from "../components/Logs";
import Detail from "../components/Detail";
import { resetProduct } from "../redux/async/productsSlice";
import { useDispatch } from "react-redux";

const Sidebar = () => {
  const dispatch = useDispatch();
  return (
    <div className="drawer lg:drawer-open">
      {/* Toggle Sidebar */}
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      {/* Main content section */}
      <div className="drawer-content flex flex-col min-h-screen">
        {/* Button to open sidebar on small screens */}
        <label htmlFor="my-drawer-2" className="btn drawer-button lg:hidden">
          <i className="bi bi-justify"></i>
        </label>

        {/* Page content */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<Detail />} />
          <Route path="/stocks" element={<Stocks />} />
          <Route path="/logs" element={<Logs />} />
        </Routes>
      </div>

      {/* Sidebar section */}
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content w-72 p-4 h-full">
          <li>
            <Link
              to="/"
              className="flex items-center space-x-3 py-2 hover:bg-primary hover:text-white rounded-md"
            >
              <i className="bi bi-house-door text-xl"></i>
              <span onClick={() => dispatch(resetProduct())}>Home</span>
            </Link>
          </li>
          <li>
            <Link
              to="/products"
              className="flex items-center space-x-3 py-2 hover:bg-primary hover:text-white rounded-md"
            >
              <i className="bi bi-boxes text-xl"></i>
              <span onClick={() => dispatch(resetProduct())}>Manage Products</span>
            </Link>
          </li>
          <li>
            <Link
              to="/stocks"
              className="flex items-center space-x-3 py-2 hover:bg-primary hover:text-white rounded-md"
            >
              <i className="bi bi-box-seam text-xl"></i>
              <span onClick={() => dispatch(resetProduct())}>Manage Stocks</span>
            </Link>
          </li>
          <li>
            <Link
              to="/logs"
              className="flex items-center space-x-3 py-2 hover:bg-primary hover:text-white rounded-md"
            >
              <i className="bi bi-list-check text-xl"></i>
              <span onClick={() => dispatch(resetProduct())}>Logs</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
