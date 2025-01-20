import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsByCategory } from '../shopProductsSlice';
import PageComponent from '../../components/PageComponent'
import SearchBar from '../../components/SearchBar';
import ProductItem from '../components/ProductItem';
import { fetchCategoryBySlug } from '../../shopCategories/shopCategoriesSlice';
import Spinner from '../../../../shared/loader/Spinner';
import Pagination from '../../../../shared/Pagination';

export default function ProductsByCategory() {
  const { categorySlug } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [tempSearchQuery, setTempSearchQuery] = useState(searchParams.get('cq') || '');
  const currentPage = parseInt(searchParams.get('page')) || 1;
  const { products, meta, isLoading: isLoadingProducts, error: errorProducts } = useSelector((state) => state.shopProducts);
  const { categories, category, isLoading: isLoadingCategory, error: errorCategory } = useSelector((state) => state.shopCategories);
  const { title, description } = category || null;

  useEffect(() => {
    setSearchQuery(searchParams.get('cq') || '');
  }, [searchParams]);

  useEffect(() => {
    const params = {
      search: searchQuery,
      page: currentPage,
    }
    dispatch(fetchProductsByCategory({ categorySlug, params }));
  }, [dispatch, categorySlug, searchQuery, currentPage]);

  useEffect(() => {
    dispatch(fetchCategoryBySlug(categorySlug));
    if (errorCategory?.status === 500) {
      navigate('/not-found');
    }
  }, [dispatch, categorySlug, errorCategory, navigate]);

  const handlePageChange = (page) => {
    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);
      newParams.set('page', page);
      return newParams;
    });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const searchValue = tempSearchQuery.trim();
    setSearchParams((prevParams) => {
      searchValue === null
        ? prevParams.delete('cq')
        : prevParams.set('cq', searchValue), prevParams.set('page', 1);
      return prevParams;
    });
    setSearchQuery(searchValue);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setTempSearchQuery(value);

    if (value.trim() === '') {
      setSearchParams((prevParams) => {
        prevParams.delete('cq');
        prevParams.set('page', 1);
        return prevParams;
      });
      setSearchQuery('');
    }
  };

  const handleSearchDelete = () => {
    setSearchParams((prevParams) => {
      prevParams.delete('cq');
      prevParams.set('page', 1);
      return prevParams;
    });
    setTempSearchQuery('');
  };

  return (
    <>
      {isLoadingProducts || isLoadingCategory ? (
        <div className="flow-root">
          <Spinner />
        </div>
      ) :
        errorProducts || errorCategory ? (
          <div className="text-center">
            {errorProducts && <p className="text-sm font-medium text-red-500">Error: {errorProducts.message}</p>}
            {errorCategory && <p className="text-sm font-medium text-red-500">Error: {errorCategory.message}</p>}
          </div>
        ) : (
          <PageComponent
            categories={categories}
            title={title}
            description={description}
          >
            <SearchBar
              searchQuery={tempSearchQuery}
              onChange={handleInputChange}
              onSubmit={handleSearchSubmit}
              onClearClick={handleSearchDelete}
              placeholder='Search in category'
            />
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
              <h2 className="sr-only">Products</h2>
              <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                {products.map((product) => (
                  <ProductItem key={product.id} product={product} />
                ))}
              </div>
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={meta?.last_page}
              onPageChange={handlePageChange}
            />
            {products.length === 0 &&
              <li className="py-5 flex justify-center">
                <p className="text-gray-500 ">
                  No products available
                </p>
              </li>
            }
          </PageComponent>
        )}
    </>
  )
}
