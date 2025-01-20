import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import PageComponent from "../../components/PageComponent";
import CategoryListItem from "../components/CategoryListItem";
import CategorySelector from "../components/CategorySelector";
import { deleteCategory, fetchAllCategories, fetchCategories } from '../categoriesSlice';
import FilterControls from "../../../../shared/FilterControls";
import Pagination from "../../../../shared/Pagination";
import { useFilterControls } from "../../../../hooks/useFilterControls";
import ConfirmationModal from "../../../../shared/ConfirmationModal";
import { useConfirmationModal } from "../../../../hooks/UseConfirmationModal";

export default function CategoriesList() {
  const dispatch = useDispatch();
  const { categories, allCategories, meta, isLoading, error } = useSelector((state) => state.categories);
  const { isOpen, config, openModal, closeModal } = useConfirmationModal();
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

  const [categoriesParentId, setCategoriesParentId] = useState(null);
  const [tempSearchQuery, setTempSearchQuery] = useState(searchQuery);

  useEffect(() => {
    const searchParams = {
      search: searchQuery,
      sort_field: sortField,
      sort_direction: sortDirection,
      page: currentPage,
    };
    dispatch(fetchCategories(searchParams));
  }, [dispatch, searchQuery, sortField, sortDirection, currentPage]);

  useEffect(() => {
    if (!allCategories.length) {
      dispatch(fetchAllCategories());
    }
  }, [dispatch, allCategories]);

  const handleSearch = () => {
    setSearchQuery(tempSearchQuery);
    setCurrentPage(1);
  };

  const handleCategoryChange = (parentId) => {
    if (categoriesParentId !== parentId) {
      setCategoriesParentId(parentId);
      setCurrentPage(1);
    }
  };

  const handleDeleteCategory = (id) => {
    openModal(`Are you sure you want to delete this category?`, () => {
      dispatch(deleteCategory(id));
    });
  };

  { isLoading && <div className="text-center text-lg">Loading...</div> }
  { error && <div className="text-center text-red-800 text-lg">{error}</div> }

  return (
    <>
      <PageComponent
        title="Categories"
      >
        {!isLoading && (
          <div>
            <CategorySelector
              onCategoryChange={handleCategoryChange}
              categories={allCategories}
            />
            <FilterControls
              searchPlaceholder="categories"
              searchQuery={tempSearchQuery}
              setSearchQuery={setTempSearchQuery}
              sortField={sortField}
              setSortField={setSortField}
              sortDirection={sortDirection}
              setSortDirection={setSortDirection}
              onSearch={handleSearch}
              clearSearch={handleClearSearch}
              sortOptions={[
                { value: "updated_at", label: "Sort By" },
                { value: "title", label: "Title" },
              ]}
            />
            {categories.length === 0 && (
              <div className="py-8 text-center text-gray-700">
                You do not have categories created
              </div>
            )}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
              {categories.map((category) => (
                <CategoryListItem
                  key={category.id}
                  category={category}
                  handleDeleteCategory={handleDeleteCategory}
                />
              ))}
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={meta?.last_page}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </PageComponent>
      {isOpen && <ConfirmationModal isOpen={isOpen} config={config} onClose={closeModal} />}
    </>
  );
}
