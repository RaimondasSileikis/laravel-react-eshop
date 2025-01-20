import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyOrders } from '../myOrdersSlice';
import OrderItem from '../components/OrderItem';

export default function MyOrders() {
  const dispatch = useDispatch();
  const { myOrders, isLoading, error } = useSelector((state) => state.myOrders);

  useEffect(() => {
    dispatch(fetchMyOrders());
  }, [dispatch]);

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold text-gray-900">My Orders</h2>
      {isLoading ? (
        <div className="text-center">
          <p>Loading...</p>
        </div>
      ) : error ? (
        <div className="text-center text-red-500">
          <p>Error: {error}</p>
        </div>
      ) : (
        <div className="mt-4">
          {myOrders.length === 0 ? (
            <p>No orders found.</p>
          ) : (
            <div className="space-y-6">
              {myOrders.map((order) => (
                <OrderItem key={order.id} order={order} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
