import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getMyOrderById } from "../myOrdersSlice";

export default function MyOrderView() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { myOrderById, isLoading, error } = useSelector((state) => state.myOrders);
  const { status, total_price, order_items = [], created_at } = myOrderById || {};

  useEffect(() => {
    dispatch(getMyOrderById(id));
  }, [dispatch, id]);

  if (isLoading) {
    return <div className="text-center py-4">Loading order details...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-4">Error: {error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 bg-white shadow rounded-lg">
      <div className="border-b pb-4 mb-4">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold">{`Order #${id}`}</h3>
          <span
            className={`text-sm font-semibold py-1 px-3 rounded-full ${
              status === 'paid'
                ? 'bg-green-200 text-green-800'
                : 'bg-yellow-200 text-yellow-800'
            }`}
          >
            {status}
          </span>
        </div>
        <div className="mt-2 text-gray-600">
          <p>Total Price: <span className="font-semibold">${parseFloat(total_price)?.toFixed(2)}</span></p>
          <p>Placed on: {new Date(created_at).toLocaleDateString()}</p>
        </div>
      </div>
      <h4 className="text-xl font-semibold mb-4">Order Items:</h4>
      <div className="space-y-6">
        {order_items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border hover:shadow"
          >
            <div className="w-2/3">
              <h5 className="font-medium text-lg">{item.product?.title}</h5>
              <p className="text-gray-600">{item.product?.description}</p>
              <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold">${parseFloat(item.unit_price * item.quantity)?.toFixed(2)}</p>
              <p className="text-sm text-gray-500">(${item.unit_price} each)</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
