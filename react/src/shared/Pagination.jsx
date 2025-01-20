export default function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="flex justify-center items-center mt-6">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        className="px-4 py-2 mx-1 text-gray-700 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        disabled={currentPage === 1}
      >
        Previous
      </button>
      {/* Current Page Indicator */}
      <span className="px-4 py-2 mx-1 text-gray-700">
        {currentPage} / {totalPages || 1}
      </span>
      {/* Next Button */}
      <button
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        className="px-4 py-2 mx-1 text-gray-700 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        disabled={currentPage >= totalPages}
      >
        Next
      </button>
    </div>
  );
}
