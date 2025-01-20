import PropTypes from 'prop-types';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';

export default function SearchBar({
  searchQuery,
  onChange = ()=>null,
  onSubmit,
  onClearClick,
  placeholder = 'Search...',
}) {
  return (
    <div className="relative mt-2 rounded-md shadow-sm mr-5">
      <button
        className="absolute inset-y- left-0 flex items-center pl-3 p-2 text-gray-400 hover:text-gray-500"
        onClick={searchQuery ? onClearClick : undefined}
      >
        {searchQuery ? (
          <XMarkIcon className="h-4 w-4 sm:text-sm" aria-hidden="true" />
        ) : (
          <MagnifyingGlassIcon className="h-4 w-4 sm:text-sm" aria-hidden="true" />
        )}
      </button>
      <div className="flex ">
        <form onSubmit={onSubmit} className="flex">
          <input
            id="search"
            name="search"
            type="text"
            required
            value={searchQuery}
            placeholder={placeholder}
            onChange={onChange}
            className="block w-full rounded-md border-0 py-1.5 pl-8 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
          />
          {searchQuery && (
            <button
              type="submit"
              className="items-center text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">Search</span>
              <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

SearchBar.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClearClick: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};
