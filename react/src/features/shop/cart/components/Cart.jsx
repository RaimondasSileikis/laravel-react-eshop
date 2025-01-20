import { Fragment, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart, fetchCartItems, removeCartItem, updateCartItem } from '../cartSlice'
import Skeleton from '../../../../shared/loader/Skeleton'
import { useConfirmationModal } from '../../../../hooks/UseConfirmationModal'
import ConfirmationModal from '../../../../shared/ConfirmationModal'
import { placeNewOrder } from '../../shopper'

export default function Cart({ cartOpen, setCartOpen }) {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((store) => store.auth)
  const { cartItems, isLoading, error } = useSelector((state) => state.cart);
  const { isOpen, config, openModal, closeModal } = useConfirmationModal();

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  const handleIncrement = (productSlug, currentQuantity) => {
    dispatch(
      updateCartItem({
        productSlug,
        quantity: currentQuantity + 1,
      })
    );
  };

  const handleDecrement = (productSlug, currentQuantity) => {
    if (currentQuantity > 1) {
      dispatch(
        updateCartItem({
          productSlug,
          quantity: currentQuantity - 1,
        })
      );
    } else {
      handleRemove(productSlug);
    }
  };

  const handleRemove = (productSlug) => {
    dispatch(removeCartItem(productSlug));
  };

  const handlePlaceOrder = (user) => {
    if (user) {
      dispatch(placeNewOrder());
      dispatch(clearCart())
    } else {
      openModal("You need to log in to proceed with checkout.", () => {
        dispatch(placeNewOrder());
      });
    }
  };

  const cartSubtotal = cartItems?.reduce((sum, item) => sum + item.quantity * item.price, 0);

  return (
    <>
      <Transition.Root show={cartOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setCartOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                        <div className="flex items-start justify-between">
                          <Dialog.Title className="text-lg font-medium text-gray-900">
                            {currentUser && 'Shopping cart'}
                            {!currentUser && 'Order summary'}
                          </Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                              onClick={() => setCartOpen(false)}
                            >
                              <span className="absolute -inset-0.5" />
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                        <div className="mt-8">
                          {isLoading ? (
                            <div className="flow-root">
                              <Skeleton type="cart" count={cartItems?.length || 2} />
                            </div>
                          ) : error ? (
                            <div className="text-center">
                              <p className="text-sm font-medium text-red-500">Error: {error}</p>
                            </div>
                          ) : (
                            <div className="flow-root">
                              <ul role="list" className="-my-6 divide-y divide-gray-200">
                                {cartItems.map((item, i) => (
                                  <li key={i} className="flex py-6">
                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                      <img
                                        src={item.image_url}
                                        alt={item.image_alt}
                                        className="h-full w-full object-cover object-center"
                                      />
                                    </div>

                                    <div className="ml-4 flex flex-1 flex-col">
                                      <div>
                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                          <h3>
                                            <NavLink to={item.product_slug} >
                                              {item.title}
                                            </NavLink>
                                          </h3>
                                          <p className="ml-4">Price: ${item.price}</p>
                                        </div>
                                      </div>
                                      <div className="flex flex-1 items-end justify-between text-sm">
                                        <div className="mt-2 flex items-center">
                                          <button
                                            onClick={() => handleDecrement(item.product_slug, item.quantity)}
                                            className="text-gray-600 hover:text-gray-900 px-2 py-1 rounded border border-gray-300"
                                          >
                                            -
                                          </button>
                                          <span className="mx-2 text-gray-700">{item.quantity}</span>
                                          <button
                                            onClick={() => handleIncrement(item.product_slug, item.quantity)}
                                            className="text-gray-600 hover:text-gray-900 px-2 py-1 rounded border border-gray-300"
                                          >
                                            +
                                          </button>
                                        </div>
                                        <p className="text-lg font-medium text-gray-900">
                                          Total: ${(item.quantity * item.price).toFixed(2)}
                                        </p>
                                      </div>
                                      <div className="flex flex-1 items-end justify-end text-sm">
                                        <div className="flex">
                                          <button
                                            type="button"
                                            onClick={() => handleRemove(item.product_slug)}
                                            className="font-medium text-indigo-600 hover:text-indigo-500"
                                          >
                                            Remove
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                      {cartItems?.length === 0 &&
                        <p className="flex justify-center mt-6 text-gray-500 border-t border-gray-200 px-4 py-6 sm:px-6">
                          Your cart is empty
                        </p>}
                      {cartItems?.length > 0 &&
                        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            {currentUser && <p>Subtotal:</p>}
                            <p> ${cartSubtotal.toFixed(2)}</p>
                          </div>
                          <p className="mt-0.5 text-sm text-gray-500">
                            Shipping and taxes calculated {currentUser && 'at checkout.'}
                          </p>
                          <div className="mt-6">
                            <button
                              onClick={() => handlePlaceOrder(currentUser)}
                              className="flex items-center w-full justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                            >
                              Checkout
                            </button>
                          </div>
                          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                            <p>
                              or{' '}
                              <button
                                type="button"
                                className="font-medium text-indigo-600 hover:text-indigo-500"
                                onClick={() => setCartOpen(false)}
                              >
                                Continue Shopping
                                <span aria-hidden="true"> &rarr;</span>
                              </button>
                            </p>
                          </div>
                        </div>}
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      <ConfirmationModal isOpen={isOpen} config={config} onClose={closeModal} />
    </>
  )
}
