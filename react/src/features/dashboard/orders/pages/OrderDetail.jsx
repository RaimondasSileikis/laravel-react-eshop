import { useEffect, } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getOrderById } from '../ordersSlice';

export default function OrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { orderById, isLoading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(getOrderById(id));
  }, [dispatch, id]);

  if (isLoading) return <div className="text-center text-lg">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  const { created_at, status, user, total_price, order_items = [] } = orderById || {};

  return (
    <div className="max-w-4xl mx-auto p-4">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-blue-500 hover:underline"
      >
        Back to Orders
      </button>

      <h1 className="text-xl font-semibold mb-4">Order Details</h1>

      <div className="bg-gray-100 p-4 rounded-md shadow-md">
        <p><strong>Order ID:</strong> {id}</p>
        <p><strong>Order Date:</strong> {new Date(created_at).toLocaleString()}</p>
        <p><strong>Status:</strong> {status}</p>
        <p><strong>Total Price:</strong> ${total_price}</p>
        <p><strong>User:</strong> {user?.name || "Unknown User"}</p>
      </div>

      <h2 className="text-lg font-medium mt-6 mb-4">Order Items</h2>
      <div className="bg-white p-4 rounded-md shadow-md">
        {order_items.length > 0 ? (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border">Product</th>
                <th className="p-2 border">Quantity</th>
                <th className="p-2 border">Unit Price</th>
                <th className="p-2 border">Total Price</th>
              </tr>
            </thead>
            <tbody>
              {orderById.order_items.map((item) => (
                <tr key={item.id} className="text-center">
                  <td className="p-2 border">{item.product?.title || "N/A"}</td>
                  <td className="p-2 border">{parseFloat(item.quantity) || "N/A"}</td>
                  <td className="p-2 border">${parseFloat(item.unit_price)?.toFixed(2) || "N/A"}</td>
                  <td className="p-2 border">
                    ${(item.quantity * item.unit_price)?.toFixed(2) || "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No items in this order.</p>
        )}
      </div>
    </div>
  );


}
