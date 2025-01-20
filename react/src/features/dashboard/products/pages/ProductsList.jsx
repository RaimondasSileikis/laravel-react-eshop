import { useEffect, useState } from "react";
import PageComponent from "../../components/PageComponent";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from 'react-redux';
import TButton from "../../../../shared/TButton";
import ProductListItem from "../components/ProductListItem";
import { deleteProduct, fetchProducts } from '../productsSlice';
import FilterControls from "../../../../shared/FilterControls";
import Pagination from "../../../../shared/Pagination";
import { useFilterControls } from "../../../../hooks/useFilterControls";
import ConfirmationModal from "../../../../shared/ConfirmationModal";
import { useConfirmationModal } from "../../../../hooks/UseConfirmationModal";

export default function ProductsList() {
  const dispatch = useDispatch();
  const { products, meta, isLoading, error } = useSelector((state) => state.products);
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

  const [tempSearchQuery, setTempSearchQuery] = useState(searchQuery);

  useEffect(() => {
    const searchParams = {
      search: searchQuery,
      sort_field: sortField,
      sort_direction: sortDirection,
      page: currentPage,
    };
    dispatch(fetchProducts(searchParams));
  }, [dispatch, searchQuery, sortField, sortDirection, currentPage]);

  const handleSearch = () => {
    setSearchQuery(tempSearchQuery);
    setCurrentPage(1);
  };

  const handleDeleteProduct = (id) => {
    openModal(`Are you sure you want to delete this product?`, () => {
      dispatch(deleteProduct(id));
    });
  };

  return (
    <>
      <PageComponent
        title="Products"
        buttons={
          <TButton to="create" color="green">
            <PlusCircleIcon className="h-6 w-6 mr-2" />
            Create New
          </TButton>
        }
      >
        {isLoading && <div className="text-center text-lg">Loading...</div>}
        {error && <div className="text-center text-red-800 text-lg">{error}</div>}
        {!isLoading && (
          <div>
            <FilterControls
              searchPlaceholder="products"
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
                { value: "price", label: "Price" },
              ]}
            />
            {products.length === 0 && (
              <div className="py-8 text-center text-gray-700">
                You do not have products created
              </div>
            )}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
              {products && products.map((product) => (
                <ProductListItem
                  key={product.id}
                  product={product}
                  handleDeleteProduct={handleDeleteProduct}
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
