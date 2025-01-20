import { Fragment, useEffect, useState } from 'react'
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../../features/auth'
import { fetchCategoriesTree, SearchBar } from '../../features/shop'
import { Cart } from '../../features/shop/cart'
import { Dialog, Menu, Popover, Tab, Transition } from '@headlessui/react'
import { Bars3Icon, UserIcon, XMarkIcon, ShoppingCartIcon } from '@heroicons/react/24/outline'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ShopNavbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [open, setOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { userToken, currentUser } = useSelector((store) => store.auth);
  const { categoriesTree } = useSelector((state) => state.shop);
  const { cartItems } = useSelector((state) => state.cart);
  const cartTotalQuantity = cartItems?.reduce((total, item) => total + item.quantity, 0) || null;

  useEffect(() => {
    dispatch(fetchCategoriesTree());
  }, [dispatch]);

  useEffect(() => {
    setSearchQuery(searchParams.get('q') || '');
  }, [searchParams]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logoutUser());
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const url = `/all?q=${encodeURIComponent(searchQuery.trim())}&page=1`;
    navigate(url);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (value.trim() === '') {
      setSearchParams((prevParams) => {
        prevParams.delete('q');
        prevParams.set('page', 1);
        return prevParams;
      });
      setSearchQuery('');
    }
  };

  const handleSearchDelete = () => {
    setSearchParams((prevParams) => {
      prevParams.delete('q');
      prevParams.set('page', 1);
      return prevParams;
    });
    setSearchQuery('');
  };

  return (
    <>
      <Cart cartOpen={cartOpen} setCartOpen={setCartOpen} />
      <div className="bg-white">
        {/* Mobile menu */}
        <Transition.Root show={open} as={Fragment}>
          <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>
            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                  <div className="flex px-4 pb-2 pt-5">
                    <button
                      type="button"
                      className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                      onClick={() => setOpen(false)}
                    >
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  {/* Links */}
                  <Tab.Group as="div" className="mt-2">
                    <div className="border-b border-gray-200">
                      <Tab.List className="-mb-px flex space-x-8 px-4">
                        {categoriesTree.map((category) => (
                          <Tab
                            key={category.id}
                            className={({ selected }) =>
                              classNames(
                                selected ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-900',
                                'flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium'
                              )
                            }
                          >
                            {category.title}
                          </Tab>
                        ))}
                      </Tab.List>
                    </div>
                    <Tab.Panels as={Fragment}>
                      {categoriesTree.map((category) => (
                        <Tab.Panel key={category.id} className="space-y-10 px-4 pb-8 pt-10">
                          <div className="grid grid-cols-2 gap-x-4">
                            {category.featured_products.map((item, index) => (
                              <div key={index} className="group relative text-sm">
                                <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                  <img src={item.image_url} alt={item.image_alt} className="object-cover object-center" />
                                </div>
                                <NavLink
                                  to={`/${item.categories[0].slug}/${item.slug}`}
                                  className="mt-6 block font-medium text-gray-900"
                                  onClick={() => setOpen(false)}
                                >
                                  <span className="absolute inset-0 z-10" aria-hidden="true" />
                                  {item.title}
                                </NavLink>
                                <p aria-hidden="true" className="mt-1">
                                  Shop now
                                </p>
                              </div>
                            ))}
                          </div>
                          {category.children.map((child) => (
                            <div key={child.id}
                              onClick={() => setOpen(false)}>
                              <NavLink
                                to={`/${child.slug}`}
                                id={`${category.id}-${child.id}-heading-mobile`}
                                className="font-medium text-gray-900"
                              >
                                {child.title}
                              </NavLink>
                              <ul
                                role="list"
                                aria-labelledby={`${category.id}-${child.id}-heading-mobile`}
                                className="mt-6 flex flex-col space-y-6"
                              >
                                {child.children && child.children.map((child) => (
                                  <li key={child.id} className="flow-root">
                                    <NavLink
                                      to={`/${child.slug}`}
                                      className="-m-2 block p-2 text-gray-500"
                                    >
                                      {child.title}
                                    </NavLink>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </Tab.Panel>
                      ))}
                    </Tab.Panels>
                  </Tab.Group>
                  <div
                    className="space-y-6 border-t border-gray-200 px-4 py-6"
                    onClick={() => setOpen(false)}
                  >
                    {/* User mobile................. */}
                    {userToken && <>
                      <div className="flex items-center ">
                        <div className="flex-shrink-0">
                          <UserIcon className='w-8 h-8  p-1 rounded-full text-gray-800' />
                        </div>
                        <div className="text-sm font-medium leading-none text-gray-700 hover:underline focus:outline-none">
                          {currentUser && currentUser.email}
                        </div>
                      </div>
                      <NavLink
                        to='/profile'
                        className="text-sm font-medium leading-none text-gray-700 hover:underline focus:outline-none"
                      >
                        Profile
                      </NavLink>
                    </>}
                    {userToken && <div className="flow-root">
                      <NavLink
                        to={'/'}
                        onClick={(e) => handleLogout(e)}
                        className="-m-2 block p-2 font-medium text-gray-900"
                      >
                        Log out
                      </NavLink>
                    </div>}
                    {!userToken && <div className="flow-root">
                      <NavLink
                        to={'/login'}
                        className="-m-2 block p-2 font-medium text-gray-900"
                      >
                        Sign in
                      </NavLink>
                    </div>}
                    {!userToken && <div className="flow-root">
                      <NavLink
                        to={'/signup'}
                        className="-m-2 block p-2 font-medium text-gray-900"
                      >
                        Create account
                      </NavLink>
                    </div>}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>
        <header className="relative bg-white">
          <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="border-b border-gray-200">
              <div className="flex h-16 items-center">
                <button
                  type="button"
                  className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
                  onClick={() => setOpen(true)}
                >
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open menu</span>
                  <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                </button>
                {/* Logo */}
                <div className="ml-4 flex lg:ml-0">
                  <a href="#">
                    <span className="sr-only">Your Company</span>
                    <img
                      className="h-8 w-auto"
                      src=""
                      alt=""
                    />
                  </a>
                </div>
                {/* Flyout menus */}
                <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                  <div className="flex h-full space-x-8">
                    {categoriesTree.map((category) => (
                      <Popover key={category.id} className="flex">
                        {({ open, close }) => (
                          <>
                            <div className="relative flex">
                              <Popover.Button
                                className={classNames(
                                  open
                                    ? 'border-indigo-600 text-indigo-600'
                                    : 'border-transparent text-gray-700 hover:text-gray-800',
                                  'relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out'
                                )}
                              >
                                {category.title}
                              </Popover.Button>
                            </div>
                            <Transition
                              as={Fragment}
                              enter="transition ease-out duration-200"
                              enterFrom="opacity-0"
                              enterTo="opacity-100"
                              leave="transition ease-in duration-150"
                              leaveFrom="opacity-100"
                              leaveTo="opacity-0"
                            >
                              <Popover.Panel className="absolute inset-x-0 top-full text-sm text-gray-500">
                                {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                                <div className="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true" />
                                <div className="relative bg-white z-50">
                                  <div className="mx-auto max-w-7xl px-8">
                                    <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                                      <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                        {category.featured_products.map((item, index) => (
                                          <div key={index} className="group relative text-base sm:text-sm">
                                            <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                              <img
                                                src={item.image_url}
                                                alt={item.image_alt}
                                                className="object-cover object-center"
                                              />
                                            </div>
                                            <NavLink
                                              to={`/${item.categories[0].slug}/${item.slug}`}
                                              replace={null}
                                              onClick={() => close()}
                                              className="mt-6 block font-medium text-gray-900"
                                            >
                                              <span className="absolute inset-0 z-10" aria-hidden="true" />
                                              {item.title}
                                            </NavLink>
                                            <p aria-hidden="true" className="mt-1">
                                              Shop now
                                            </p>
                                          </div>
                                        ))}
                                      </div>
                                      <div
                                        className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm"
                                      >
                                        {category.children.map((child) => (
                                          <div
                                            key={child.id}
                                          >
                                            <NavLink
                                              onClick={() => close()}
                                              to={`/${child.slug}`} id={`${child.title}-heading`}
                                              className="font-medium text-gray-900 ">
                                              {child.title}
                                            </NavLink>
                                            <ul
                                              role="list"
                                              aria-labelledby={`${child.title}-heading`}
                                              className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                            >
                                              {child.children && child.children.map((child) => (
                                                <li key={child.id} className="flex">
                                                  <NavLink
                                                    to={`/${child.slug}`}
                                                    onClick={() => close()}
                                                    className="hover:text-gray-800"
                                                  >
                                                    {child.title}
                                                  </NavLink>
                                                </li>
                                              ))}
                                            </ul>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </Popover.Panel>
                            </Transition>
                          </>
                        )}
                      </Popover>
                    ))}
                  </div>
                </Popover.Group>
                <div className="ml-auto flex items-center">
                  <SearchBar
                    searchQuery={searchQuery}
                    onChange={handleInputChange}
                    onSubmit={onSubmit}
                    onClearClick={handleSearchDelete}
                    placeholder='Search'
                  />
                  <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                    {/* Profile dropdown */}
                    {userToken && <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className="relative flex max-w-xs items-center  text-gray-700 hover:text-gray-800 hover:underline focus:outline-none text-sm ">
                          <span className="absolute -inset-1.5" />
                          <span className="sr-only">Open user menu</span>
                          <UserIcon className='w-7 h-7  p-1 rounded-full text-gray-800' />
                          {currentUser && currentUser.email}
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ">
                          <Menu.Item >
                            {({ active }) => (
                              <NavLink
                                to='/profile'
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700'
                                )}
                              >
                                Profile
                              </NavLink>
                            )}
                          </Menu.Item>
                          <Menu.Item >
                            {({ active }) => (
                              <NavLink
                                to='/'
                                onClick={(e) => handleLogout(e)}
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700'
                                )}
                              >
                                Log Out
                              </NavLink>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>}
                    {!userToken && <>
                      <NavLink to={'/login'} className="text-sm font-medium text-gray-700 hover:text-gray-800">
                        Sign in
                      </NavLink>
                      <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                      <NavLink to={'/signup'} className="text-sm font-medium text-gray-700 hover:text-gray-800">
                        Create account
                      </NavLink>
                    </>}
                  </div>
                  {/* Cart */}
                  <div className="ml-4 flow-root lg:ml-6">
                    <a href="#" className="group -m-2 flex items-center p-2"
                      onClick={() => setCartOpen(true)}
                    >
                      <ShoppingCartIcon
                        className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                      />
                      <span className="min-w-4 ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                        {cartTotalQuantity}
                      </span>
                      <span className="sr-only">items in cart, view bag</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </nav >
        </header >
      </div >
    </>
  )
}
