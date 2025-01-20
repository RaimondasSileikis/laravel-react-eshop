import { useDispatch } from 'react-redux';
import { updateOrderStatus } from '../ordersSlice';
import StatusDropdown from './StatusDropdown';
import TButton from '../../../../shared/TButton';
import ConfirmationModal from '../../../../shared/ConfirmationModal';
import { useConfirmationModal } from '../../../../hooks/UseConfirmationModal';

export default function OrdersListItem({ order, memoizedStatuses }) {
  const dispatch = useDispatch();
  const { id, user, total_price, status } = order || {}
  const { isOpen, config, openModal, closeModal } = useConfirmationModal();

  const handleStatusChange = (newStatus) => {
    openModal(`Are you sure you want to change the status to "${newStatus}"?`, () => {
      dispatch(updateOrderStatus({ orderId: id, status: newStatus }));
    });
  };

  return (
    <>
      <tr>
        <td className="border px-4 py-2 text-center">{id}</td>
        <td className="border px-4 py-2 text-center">{user.name}</td>
        <td className="border px-4 py-2 text-center">${total_price}</td>
        <td className="border px-4 py-2 text-center">
          <StatusDropdown currentStatus={status} memoizedStatuses={memoizedStatuses} onChange={handleStatusChange} />
        </td>
        <td className="border px-4 py-2 text-center">
          <TButton
            to={(`/dashboard/orders/${id}`)}
          >View Details
          </TButton>
        </td>
      </tr>
      <ConfirmationModal isOpen={isOpen} config={config} onClose={closeModal} />
    </>
  );
}
