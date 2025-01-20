import { toast } from "react-toastify";

const HandleDelete = ({ type, deleteAction }) => {
  const confirmToast = () => (
    <div className="flex flex-col">
      <p className="mb-3">
        Are you sure you want to delete this {type}?
        </p>
      <div className="flex justify-end gap-2">
        <button
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
          onClick={() => toast.dismiss()}
        >
          Cancel
        </button>
        <button
          className="px-4 py-2 bg-red-600 text-white rounded-md"
          onClick={() => {
            deleteAction();
            toast.dismiss();
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );

  toast(confirmToast, {
    closeOnClick: false,
    draggable: false,
  });
};

export default HandleDelete;
