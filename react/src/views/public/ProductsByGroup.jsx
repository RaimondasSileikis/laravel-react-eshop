import PageComponent from '../../components/public/PageComponent'
import Breadcrumb from '../../components/public/Breadcrumb'
import Products from '../../components/public/Products';
import { useStateContext } from '../../contexts/ContextProvider';
import { NavLink, useParams } from 'react-router-dom';


const products = [
  // {
  //   price: 25, id: 'Tops', name: 'Tops', href: '#', imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
  //   imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
  // },
  {
    price: 25, id: 'Dresses', name: 'Dresses', href: '#', imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
    imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
  },
  {
    price: 25, id: 'Pants', name: 'Pants', href: '#', imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
    imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
  },
  {
    price: 25, id: 'Denim', name: 'Denim', href: '#', imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
    imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
  },
  {
    price: 25, id: 'Sweaters', name: 'Sweaters', href: '#', imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
    imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
  },
  {
    price: 25, id: 'T-Shirts', name: 'T-Shirts', href: '#', imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
    imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
  },
  {
    price: 25, id: 'Jackets', name: 'Jackets', href: '#', imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
    imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
  },
  {
    price: 25, id: 'Activewear', name: 'Activewear', href: '#', imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
    imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
  },
  {
    price: 25, id: 'Browse All', name: 'Browse All', href: '#', imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
    imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
  },
  {
    price: 25, id: 'Watches', name: 'Watches', href: '#', imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg',
    imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
  },
  {
    price: 25, id: 'Wallets', name: 'Wallets', href: '#', imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg',
    imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
  },
  {
    price: 25, id: 'Bags', name: 'Bags', href: '#', imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg',
    imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
  },
  {
    price: 25, id: 'Sunglasses', name: 'Sunglasses', href: '#', imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg',
    imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
  },
  {
    price: 25, id: 'Hats', name: 'Hats', href: '#', imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg',
    imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
  },
  {
    price: 25, id: 'Belts', name: 'Belts', href: '#', imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg',
    imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
  },
]

export default function ProductsByCategory() {
  const { eshopNavigation } = useStateContext()

  const params = useParams()
  console.log('params', params);

  const selectedGroup = eshopNavigation.collections
    .flatMap(collection => [
      ...(collection.id === params.groupSlug ? [collection] : []),
      ...(collection.categories.filter(cat => cat.id === params.groupSlug)),
      ...(collection.categories.flatMap(cat => cat.sections.filter(sec => sec.id === params.groupSlug)))
    ])
    .find(item => item);

  console.log('selected:', selectedGroup);

  const selectedGroupCategories = selectedGroup.categories || selectedGroup.sections

  return (
    <PageComponent>
      <Breadcrumb />
      <div className="grid grid-cols-4 gap-x-2 gap-y-10 sm:grid-cols-6 lg:grid-cols-8 xl:grid-cols-9 xl:gap-x-8 my-10">
        {selectedGroupCategories && selectedGroupCategories.map((category) => (
          <NavLink
            key={category.id} to={`/${category.id}`} className="group flex flex-col items-center">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
              <img
                src={category.imageSrc}
                alt={category.imageAlt}
                className="h-full w-full object-cover object-center group-hover:opacity-75"
              />
            </div>
            <h3 className="mt-4 text-sm text-gray-700 ">{category.name}</h3>

          </NavLink>
        ))}
      </div>

      <hr />
      {/* <p className='flex p-4'> {selectedGroup.description}</p> */}

      <Products products={products} />
    </PageComponent>
  )
}
