import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';

export default function Search({
  onFocus = () => false,
  onBlur = () => true,
  searchQuery,
  onChange = '',
  onSubmit = '',
  onClick = '',
  placeholder = ''
}) {

  return (
    <div className="relative mt-2 rounded-md shadow-sm">
      <button
        className=" absolute inset-y-0 left-0 flex items-center pl-3 lg:ml-6 p-2 text-gray-400 hover:text-gray-500">
        {searchQuery && <XMarkIcon onClick={onClick} className="sm:text-sm h-4 w-4" aria-hidden="true" />}
        {!searchQuery && <MagnifyingGlassIcon className="sm:text-sm h-4 w-4" aria-hidden="true" />}
      </button>
      <div className="flex lg:ml-6">
        <form
          onSubmit={onSubmit}
          onFocus={onFocus}
          onBlur={onBlur}
          className="flex"
        >
          <div >
            <div className="p-2">
              <input
                id="search"
                name="search"
                type="text"
                required
                value={searchQuery}
                placeholder={placeholder}
                onChange={onChange}
                className="block h-3/6 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-6"
              />
            </div>
          </div>
          {searchQuery && <button
            type="submit"
            className=" items-center text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Search</span>
            <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
          </button>}
        </form>
      </div>
    </div>
  )
}
