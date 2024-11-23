import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { resetProduct } from "../redux/async/productsSlice";

const Detail = () => {
  const { product } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  return (
    <>
      <div className="hero min-h-screen flex items-start">
        <div className="hero-content text-justify">
          <div className="max-w-max bg-base-300 rounded-lg p-4">
            <Link to="/products">
              <button
                onClick={() => dispatch(resetProduct())}
                className="btn btn-outline btn-sm"
              >
                Back
              </button>
            </Link>
            <h1 className="text-3xl text-center font-bold py-2">
              <i className="bi bi-boxes text-3xl mr-2"></i>
              {product.name}
            </h1>
            <p className="py-2">
              <i className="bi bi-box mr-2"></i>Id : {product.id}
            </p>
            <p className="py-2">
              <i className="bi bi-card-text mr-2"></i>Description :{" "}
              {product.description}
            </p>
            <p className="py-2">
              <i className="bi bi-tags mr-2"></i>Price : {product.price}
            </p>
            <p className="py-2">
              <i className="bi bi-box-seam mr-2"></i>Stock : {product.stock}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Detail;
