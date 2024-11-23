import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar bg-base-300 shadow-md">
      <div className="flex-1">
        <Link to={"/"} className="btn btn-ghost text-lg md:text-xl">
          <i className="bi bi-gear"></i>
          Product Management System
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
