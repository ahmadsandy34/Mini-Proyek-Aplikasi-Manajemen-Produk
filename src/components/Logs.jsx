import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchLogs } from "../redux/async/logsSlice";

const Logs = () => {
  const { logs, loading, error } = useSelector((state) => state.logs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLogs());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="overflow-x-auto mt-4">
      <h2 className="text-2xl font-bold mb-4 ml-4"><i className="bi bi-list-check text-2xl"></i> Logs</h2>
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Id</th>
            <th>Product Id</th>
            <th>Type</th>
            <th>Quantity</th>
            <th>Note</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {logs.length === 0 && (
            <tr>
              <td colSpan="7" className="text-center">No logs available.</td>
            </tr>
          )}
          {logs.map((log, index) => (
            <tr key={log.id} className="hover">
              <th>{index + 1}</th>
              <td>{log.id}</td>
              <td>{log.product_id}</td>
              <td>{log.type}</td>
              <td>{log.quantity}</td>
              <td>{log.note}</td>
              <td>{log.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Logs;
