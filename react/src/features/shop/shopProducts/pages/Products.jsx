import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProducts } from '../shopProductsSlice';
import PageComponent from '../../components/PageComponent'
import ProductItem from '../components/ProductItem';
import Spinner from '../../../../shared/loader/Spinner';
import Pagination from '../../../../shared/Pagination';

export default function Products() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  const currentPage = parseInt(searchParams.get('page')) || 1;
  const { products, categories, meta, isLoading, error } = useSelector((state) => state.shopProducts);

  useEffect(() => {
    const params = {
      search: searchQuery,
      page: currentPage,
    }
    dispatch(fetchAllProducts(params));
  }, [currentPage, dispatch, searchQuery]);

  const handlePageChange = (page) => {
    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);
      newParams.set('page', page);
      return newParams;
    });
  };

  return (
    <>
      {isLoading ? (
        <div className="flow-root">
          <Spinner />
        </div>
      ) : error ? (
        <div className="text-center">
          <p className="text-sm font-medium text-red-500">Error: {error.message}</p>
        </div>
      ) : (
        <PageComponent
          categories={categories}
          description={`Here are the search results for the phrase "${searchQuery}"`}
        >
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
          {products.length === 0 && <div>
            <h1>No products</h1>
          </div>
          }
        </PageComponent>
      )}
    </>
  )
}
