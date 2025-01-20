import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PageComponent from '../../components/PageComponent';
import { fetchOrders, getOrderStatuses } from '../ordersSlice';
import OrdersListItem from '../components/OrdersListItem';
import Pagination from '../../../../shared/Pagination';
import FilterControls from '../../../../shared/FilterControls';
import { useFilterControls } from '../../../../hooks/useFilterControls';

export default function OrdersList() {
  const dispatch = useDispatch();
  const { orders, meta, orderStatuses, isLoading, error } = useSelector((state) => state.orders);

  const {
    searchQuery,
    setSearchQuery,
    sortField,
    setSortField,
    sortDirection,
    setSortDirection,
    currentPage,
    setCurrentPage,
    handleClearSearch,
  } = useFilterControls({
    defaultSortField: "created_at",
    defaultSortDirection: "desc",
  });
  const [tempSearchQuery, setTempSearchQuery] = useState(searchQuery);

  const memoizedStatuses = useMemo(() => orderStatuses, [orderStatuses]);

  useEffect(() => {
    const searchParams = {
      search: searchQuery,
      sort_field: sortField,
      sort_direction: sortDirection,
      page: currentPage,
    };
    dispatch(fetchOrders(searchParams));
  }, [dispatch, searchQuery, sortField, sortDirection, currentPage]);

  useEffect(() => {
    if (!orderStatuses.length) {
      dispatch(getOrderStatuses());
    }
  }, [dispatch, orderStatuses.length]);

  const handleSearch = () => {
    setSearchQuery(tempSearchQuery);
    setCurrentPage(1);
  };

  if (isLoading) return <div>Loading orders...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <PageComponent title="Orders">
      <div className="overflow-x-auto">
        <FilterControls
          searchPlaceholder="orders products"
          searchQuery={tempSearchQuery}
          setSearchQuery={setTempSearchQuery}
          sortField={sortField}
          setSortField={setSortField}
          sortDirection={sortDirection}
          setSortDirection={setSortDirection}
          onSearch={handleSearch}
          clearSearch={handleClearSearch}
          sortOptions={
            [
              { value: "created_at", label: "Sort By" },
              { value: "id", label: "Order No" },
              { value: "status", label: "Status" },
              { value: "total_price", label: "Total Price" },
              { value: "user_name", label: "User" },
            ]
          }
        />
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Order Number</th>
              <th className="border px-4 py-2">User</th>
              <th className="border px-4 py-2">Total Price</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <OrdersListItem key={order.id} order={order} memoizedStatuses={memoizedStatuses} />
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={meta?.last_page}
        onPageChange={setCurrentPage}
      />
    </PageComponent>
  );
}
