import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProducts,
  addProduct,
  deleteProduct,
  updateProduct,
  currentProduct,
  resetProduct,
} from "../redux/async/productsSlice";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Products = () => {
  const { products, product, loading, error, isSuccess, isUpdate } = useSelector(
    (state) => state.products
  );
  const [newProduct, setNewProduct] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
    stock: "",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "id", direction: "asc" });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(fetchProducts());
      setNewProduct({
        id: "",
        name: "",
        description: "",
        price: "",
        stock: "",
      });
    }
  }, [isSuccess]);

  useEffect(() => {
    if (product?.id) {
      setNewProduct({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const productData = {
      ...newProduct,
      price: parseInt(newProduct.price),  
      stock: parseInt(newProduct.stock),  
    };
  
    if (isUpdate) {
      dispatch(updateProduct(productData));
    } else {
      dispatch(addProduct(productData));
    }
    setNewProduct({
      id: "",
      name: "",
      description: "",
      price: "",
      stock: "",
    });
    dispatch(resetProduct());
  };

  const handleDelete = (productId) => {
    Swal.fire({
      title: "Are you sure you want to delete this product?",
      text: "You will not be able to revert this process",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted",
          text: "The product has been deleted successfully",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
        dispatch(deleteProduct(productId));
      }
    });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const getSortedProducts = () => {
    let sortedProducts = [...products];
    const { key, direction } = sortConfig;

    sortedProducts.sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === "asc" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === "asc" ? 1 : -1;
      }
      return 0;
    });

    return sortedProducts;
  };

  const filteredProducts = getSortedProducts().filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="overflow-x-auto mt-4">
      <h2 className="text-2xl font-bold px-4 mb-4">
        <i className="bi bi-boxes text-2xl"></i> Products
      </h2>

      <div className="mb-4 mx-4">
        <input
          type="text"
          placeholder="Search by Name"
          value={searchQuery}
          onChange={handleSearchChange}
          className="input input-bordered w-full max-w-xs"
        />
      </div>

      <div className="border border-base-300 rounded-lg mx-2 mt-2 mb-8 p-4">
        <h3 className="text-xl font-bold mb-4">{isUpdate ? "Update Product" : "Add Product"}</h3>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col md:grid grid-cols-3 gap-4">
            <label htmlFor="id" className="input input-bordered flex items-center gap-2">
              Id
              <input
                type="number"
                className="grow"
                value={newProduct.id}
                onChange={handleChange}
                name="id"
                id="id"
                placeholder="Input number"
                required
              />
            </label>
            <label htmlFor="name" className="input input-bordered flex items-center gap-2">
              Name
              <input
                type="text"
                className="grow"
                value={newProduct.name}
                onChange={handleChange}
                name="name"
                id="name"
                placeholder="Input text"
                required
              />
            </label>
            <label htmlFor="description" className="input input-bordered flex items-center gap-2">
              Description
              <input
                type="text"
                className="grow"
                value={newProduct.description}
                onChange={handleChange}
                name="description"
                id="description"
                placeholder="Input text"
                required
              />
            </label>
            <label htmlFor="price" className="input input-bordered flex items-center gap-2">
              Price
              <input
                type="number"
                className="grow"
                value={newProduct.price}
                onChange={handleChange}
                name="price"
                id="price"
                placeholder="Input number"
                required
              />
            </label>
            <label htmlFor="stock" className="input input-bordered flex items-center gap-2">
              Stock
              <input
                type="number"
                className="grow"
                value={newProduct.stock}
                onChange={handleChange}
                name="stock"
                id="stock"
                placeholder="Input number"
                required
              />
            </label>
            <button
              type="submit"
              className={`btn ${
                isUpdate ? "btn-outline btn-warning" : "btn-outline btn-primary"
              }`}
            >
              {isUpdate ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th></th>
            <th>
              <button onClick={() => handleSort("id")} className="btn btn-ghost">
                Id
                {sortConfig.key === "id" && (
                  <i
                    className={`bi ${
                      sortConfig.direction === "asc" ? "bi-arrow-up" : "bi-arrow-down"
                    } ms-2`}
                  />
                )}
              </button>
            </th>
            <th>
              <button onClick={() => handleSort("name")} className="btn btn-ghost">
                Name
                {sortConfig.key === "name" && (
                  <i
                    className={`bi ${
                      sortConfig.direction === "asc" ? "bi-arrow-up" : "bi-arrow-down"
                    } ms-2`}
                  />
                )}
              </button>
            </th>
            <th>
              <button onClick={() => handleSort("description")} className="btn btn-ghost">
                Description
                {sortConfig.key === "description" && (
                  <i
                    className={`bi ${
                      sortConfig.direction === "asc" ? "bi-arrow-up" : "bi-arrow-down"
                    } ms-2`}
                  />
                )}
              </button>
            </th>
            <th>
              <button onClick={() => handleSort("price")} className="btn btn-ghost">
                Price
                {sortConfig.key === "price" && (
                  <i
                    className={`bi ${
                      sortConfig.direction === "asc" ? "bi-arrow-up" : "bi-arrow-down"
                    } ms-2`}
                  />
                )}
              </button>
            </th>
            <th>
              <button onClick={() => handleSort("stock")} className="btn btn-ghost">
                Stock
                {sortConfig.key === "stock" && (
                  <i
                    className={`bi ${
                      sortConfig.direction === "asc" ? "bi-arrow-up" : "bi-arrow-down"
                    } ms-2`}
                  />
                )}
              </button>
            </th>
            <th>Detail</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.length === 0 ? (
            <tr>
              <td colSpan="9" className="text-center">
                No products available.
              </td>
            </tr>
          ) : (
            filteredProducts.map((product, index) => (
              <tr key={product.id} className="hover">
                <th>{index + 1}</th>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.price}</td>
                <td>{product.stock}</td>
                <td className="text-center p-2">
                  <Link to={`/products/${product.id}`}>
                    <button
                      onClick={() => dispatch(currentProduct(product))}
                      className="btn btn-outline btn-info btn-sm"
                    >
                      <i className="bi bi-info-circle"></i>
                    </button>
                  </Link>
                </td>
                <td className="text-center p-2">
                  <button
                    onClick={() => dispatch(currentProduct(product))}
                    className="btn btn-outline btn-warning btn-sm"
                  >
                    <i className="bi bi-pencil-square"></i>
                  </button>
                </td>
                <td className="text-center p-2">
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="btn btn-outline btn-error btn-sm"
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Products;
