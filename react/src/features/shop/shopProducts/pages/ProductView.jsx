import { useEffect } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductBySlug } from '../shopProductsSlice'
import PageComponent from '../../components/PageComponent'
import { addCartItem } from '../../cart/cartSlice'
import Spinner from '../../../../shared/loader/Spinner'

export default function ProductView() {
  const navigate = useNavigate();
  const { productSlug } = useParams();
  const dispatch = useDispatch();
  const { product, isLoading, error } = useSelector((state) => state.shopProducts);

  useEffect(() => {
    dispatch(fetchProductBySlug(productSlug));
  }, [dispatch, productSlug]);

  const {
    title,
    description,
    details,
    price,
    image_url,
    image_alt } = product || {};

  const handleAddToCart = async (product) => {
    dispatch(addCartItem({ product, quantity: 1 }));
    navigate(-1);
  };

  return (
    <PageComponent  >
      {isLoading ? (
        <div className="flow-root">
          <Spinner />
        </div>
      ) : error ? (
        <div className="text-center">
          <p className="text-sm font-medium text-red-500">Error: {error}</p>
        </div>
      ) : (
        <div className="bg-white">
          <div className="pt-6">
            <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
              <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
                <img
                  src={image_url}
                  alt={image_alt}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
                <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                  <img
                    src={product.image_url}
                    alt={product.image_alt}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                  <img
                    src={product.image_url}
                    alt={product.image_alt}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              </div>
              <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
                <img
                  src={image_url}
                  alt={image_alt}
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>
            <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
              <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{title}</h1>
              </div>
              <div className="mt-4 lg:row-span-3 lg:mt-0">
                <h2 className="sr-only">Product information</h2>
                <p className="text-3xl tracking-tight text-gray-900">{price}</p>
                <form className="mt-10">
                  <NavLink to='../'>
                    <button
                      type="submit"
                      onClick={() => handleAddToCart(product)}
                      className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Add to bag
                    </button>
                  </NavLink>
                </form>
              </div>
              <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                <div>
                  <h3 className="sr-only">Description</h3>
                  <div className="space-y-6">
                    <p className="text-base text-gray-900">{description}</p>
                  </div>
                </div>
                <div className="mt-10">
                  <h2 className="text-sm font-medium text-gray-900">Details</h2>
                  <div className="mt-4 space-y-6">
                    <p className="text-sm text-gray-600">{details}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </PageComponent>
  )
}
