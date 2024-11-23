import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProducts,
  currentProduct,
  resetProduct,
  stockIn,
  stockOut,
} from "../redux/async/productsSlice";
import { addLog } from "../redux/async/logsSlice";

const Stocks = () => {
  const { products, product, loading, error, isSuccess } = useSelector(
    (state) => state.products
  );
  const dispatch = useDispatch();
  const [newStock, setNewStock] = useState("");
  const [note, setNote] = useState("");
  const [stockState, setStockState] = useState("");

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(fetchProducts());
    }
  }, [isSuccess]);

  useEffect(() => {
    if (product?.id) {
      setNewStock(product.stock);
    }
  }, [product]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const productId = product?.id;

    const updatedStock = parseInt(newStock);

    if (stockState === "in" && productId) {
      const tempStock = product?.stock;
      dispatch(stockIn({ id: productId, stock: updatedStock }));
      dispatch(
        addLog({
          product_id: product?.id, 
          type: "stock_in",
          quantity: updatedStock - tempStock,
          note,
          date: new Date().toISOString(),
        })
      );
    } else if (stockState === "out" && productId) {
      const tempStock = product?.stock;
      dispatch(stockOut({ id: productId, stock: updatedStock }));
      dispatch(
        addLog({
          product_id: product?.id,
          type: "stock_out",
          quantity: tempStock - updatedStock,
          note,
          date: new Date().toISOString(),
        })
      );
    }
    setNewStock("");
    setStockState("");
    setNote("");
    dispatch(resetProduct());
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="overflow-x-auto mt-4">
      <h2 className="text-2xl font-bold mb-4 ml-4">
        <i className="bi bi-box-seam text-2xl"></i> Stocks
      </h2>

      {(stockState === "in" || stockState === "out") && (
        <div className="mb-4 mx-4">
          <div className="border border-base-300 rounded-lg mt-2 mb-8 p-4">
            <h2 className="text-2xl font-bold mb-4">
              {stockState === "in"
                ? `Stock In Product: ${product?.name}`
                : `Stock Out Product: ${product?.name}`}
            </h2>
            <form onSubmit={handleSubmit}>
              <input
                type="number"
                placeholder="Input new stock"
                value={newStock}
                onChange={(e) => setNewStock(e.target.value)}
                className="input input-bordered w-full max-w-xs"
                required
                min={stockState === "in" ? product?.stock : 0}
                max={stockState === "out" ? product?.stock : 9999}
              />
              <input
                type="text"
                placeholder="Note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="input input-bordered w-full max-w-xs mt-4 md:ml-2"
                required
              />
              <button
                type="submit"
                className="btn btn-outline btn-primary mt-4 md:ml-2"
              >
                Save
              </button>
            </form>
          </div>
        </div>
      )}

      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Id</th>
            <th>Name</th>
            <th>Stock</th>
            <th>Stock In</th>
            <th>Stock Out</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {products.length === 0 && (
            <tr>
              <td colSpan="6" className="text-center">
                No products available.
              </td>
            </tr>
          )}
          {products.map((product, index) => (
            <tr key={product.id} className="hover">
              <th>{index + 1}</th>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.stock}</td>
              <td className>
                <button
                  onClick={() =>
                    dispatch(currentProduct(product)) && setStockState("in")
                  }
                  className="btn btn-outline btn-accent"
                >
                  <i className="bi bi-box-seam text-xs md:text-xl"></i>
                  <i className="bi bi-plus text-xs md:text-xl"></i>
                </button>
              </td>
              <td>
                <button
                  onClick={() =>
                    dispatch(currentProduct(product)) && setStockState("out")
                  }
                  className="btn btn-outline btn-secondary"
                >
                  <i className="bi bi-box-seam text-xs md:text-xl"></i>
                  <i className="bi bi-dash text-xs md:text-xl"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Stocks;
