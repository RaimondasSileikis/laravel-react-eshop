import { useDispatch, useSelector } from "react-redux";
import PageComponent from "../components/PageComponent";
import { fetchOverview } from "../dashboardSlice";
import { useEffect } from "react";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { overview, isLoading, error } = useSelector((state) => state.dashboard)

  const {
    totalOrders = 0,
    totalRevenue = 0,
    totalUsers = 0,
    totalProducts = 0,
    pendingOrders = 0, } = overview || {};

  useEffect(() => {
    if (Object.keys(overview).length === 0) {
      dispatch(fetchOverview());
    }
  }, [dispatch, overview]);

  return (
    <PageComponent title="Dashboard">
      {isLoading && <div className="text-center text-lg">Loading...</div>}
      {error && <div className="text-center text-red-800 text-lg">{error}</div>}
      {!isLoading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-3 bg-white rounded-lg shadow-md">
            <h2 className="text-x2 font-bold">Total Orders</h2>
            <p className="text-2xl mt-2">{totalOrders}</p>
          </div>
          <div className="p-3 bg-white rounded-lg shadow-md">
            <h2 className="text-x2 font-bold">Total Revenue</h2>
            <p className="text-2xl mt-2">${parseInt(totalRevenue).toFixed(2)}</p>
          </div>
          <div className="p-3 bg-white rounded-lg shadow-md">
            <h2 className="text-x2 font-bold">Total Users</h2>
            <p className="text-2xl mt-2">{totalUsers}</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-x2 font-bold">Total Products</h2>
            <p className="text-2xl mt-2">{totalProducts}</p>
          </div>
          <div className="p-3 bg-white rounded-lg shadow-md">
            <h2 className="text-x2 font-bold">Pending Orders</h2>
            <p className="text-2xl mt-2">{pendingOrders}</p>
          </div>
        </div>
      )}
    </PageComponent>
  );
}
