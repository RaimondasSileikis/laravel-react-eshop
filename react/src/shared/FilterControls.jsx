export default function FilterControls({
  searchPlaceholder = "",
  searchQuery,
  setSearchQuery,
  sortField,
  setSortField,
  sortDirection,
  setSortDirection,
  onSearch,
  clearSearch,
  sortOptions = [],
}) {
  const handleSortFieldChange = (e) => setSortField(e.target.value);
  const handleSortDirectionChange = (e) => setSortDirection(e.target.value);

  return (
    <div className="bg-white p-4 shadow-md rounded-lg mb-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
      {/* Search Bar */}
      <div className="flex items-center w-full md:w-1/2">
        <input
          type="text"
          placeholder={`Search for ${searchPlaceholder}...`}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (<button
          onClick={clearSearch}
          className="ml-2 px-1 py-2 text-indigo-500 rounded-md hover:text-indigo-600 focus:outline-none"
        >
          x
        </button>)}
        <button
          onClick={onSearch}
          className="ml-2 px-4 py-2 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Search
        </button>
      </div>

      {/* SortOptions */}
      <div className="flex flex-wrap items-center gap-4">
        {/* Sort By Field */}
        <div className="flex items-center space-x-2">
          <select
            id="sortField"
            className="p-2 pr-8 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
            value={sortField}
            onChange={handleSortFieldChange}
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Direction */}
        <div className="flex items-center space-x-2">
          <select
            id="sortDirection"
            className="p-2 pr-8 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
            value={sortDirection}
            onChange={handleSortDirectionChange}
          >
             <option value="desc">High to Low</option>
             <option value="asc">Low to High</option>
          </select>
        </div>
      </div>
    </div>
  );
}
