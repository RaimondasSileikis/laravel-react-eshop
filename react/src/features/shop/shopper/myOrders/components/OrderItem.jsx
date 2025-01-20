import { Link } from "react-router-dom";

export default function OrderItem({ order }) {
  const {id, status, total_price, order_items, created_at} = order || {};

  return (
        <div
          key={id}
          className="border p-4 rounded-lg shadow-sm hover:shadow-md"
        >
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">{`Order #${id}`}</h3>
            <span className={`text-sm font-semibold py-1 px-2 rounded-full ${order.status === 'paid' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}`}>
              {status}
            </span>
          </div>
          <div className="mt-2">
            <p className="text-gray-600">Total: ${total_price}</p>
            <p className="text-sm text-gray-500">
              Placed on {new Date(created_at).toLocaleDateString()}
            </p>
          </div>
          <div className="mt-4">
        <h4 className="font-bold text-lg mb-2">Order Items : {order_items?.length}</h4>
      </div>
          <div className="mt-4 flex justify-between items-center">
            <Link
              to={`/profile/my-orders/${id}`}
              className="text-blue-600 hover:underline"
            >
              View Order Details
            </Link>

          </div>
        </div>
  );
}

