import PageComponent from '../../components/public/PageComponent'
import Breadcrumb from '../../components/public/Breadcrumb'
import Products from '../../components/public/Products';




const products = [
  {
    id: 1,
    name: 'Earthen Bottle',
    href: '#',
    subcategory: {
      id: 1,
      name: 'Men',
    },
    price: '$48',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
    imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
  },
  {
    id: 2,
    name: 'Nomad Tumbler',
    href: '#',
    subcategory: {
      id: 2,
      name: 'Men2',
    },
    price: '$35',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg',
    imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
  },
  {
    id: 3,
    name: 'Focus Paper Refill',
    href: '#',
    subcategory: {
      id: 3,
      name: 'Men',
    },
    price: '$89',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg',
    imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
  },
  {
    id: 4,
    name: 'Machined Mechanical Pencil',
    href: '#',
    subcategory: {
      id: 4,
      name: 'Men',
    },
    price: '$35',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
    imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
  },
  // More products...
]// Products by category and by section



const categories = [
  {
    id: 'women',
    name: 'Women',
    featured: [
      {
        name: 'New Arrivals',
        href: '#',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg',
        imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
      },
      {
        name: 'Basic Tees',
        href: '#',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg',
        imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
      },
    ],
    subcategories: [
      {
        id: 'clothing',
        name: 'Clothing',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg',
        imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
        items: [
          {
            price: 25, id: 'Tops', name: 'Tops', href: '#', imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
            imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
          },
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
        ],
      },
      {
        id: 'accessories',
        name: 'Accessories',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg',
        imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
        items: [
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
        ],
      },
      {
        id: 'brands',
        name: 'Brands',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg',
        imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
        items: [
          {
            price: 25, id: 'Full Nelson', name: 'Full Nelson', href: '#', imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg',
            imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
          },
          {
            price: 25, id: 'My Way', name: 'My Way', href: '#', imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg',
            imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
          },
          {
            price: 25, id: 'Re-Arranged', name: 'Re-Arranged', href: '#', imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg',
            imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
          },
          {
            price: 25, id: 'Counterfeit', name: 'Counterfeit', href: '#', imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg',
            imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
          },
          {
            price: 25, id: 'Significant Other', name: 'Significant Other', href: '#', imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg',
            imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
          },
        ],
      },
    ],
  },
  {
    id: 'men',
    name: 'Men',
    featured: [
      {
        name: 'New Arrivals',
        href: '#',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg',
        imageAlt: 'Drawstring top with elastic loop closure and textured interior padding.',
      },
      {
        name: 'Artwork Tees',
        href: '#',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-06.jpg',
        imageAlt:
          'Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.',
      },
    ],
    subcategories: [
      {
        id: 'clothing',
        name: 'Clothing',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
        imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
        items: [
          { name: 'Tops', href: '#' },
          { name: 'Pants', href: '#' },
          { name: 'Sweaters', href: '#' },
          { name: 'T-Shirts', href: '#' },
          { name: 'Jackets', href: '#' },
          { name: 'Activewear', href: '#' },
          { name: 'Browse All', href: '#' },
        ],
      },
      {
        id: 'accessories',
        name: 'Accessories',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
        imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
        items: [
          { name: 'Watches', href: '#' },
          { name: 'Wallets', href: '#' },
          { name: 'Bags', href: '#' },
          { name: 'Sunglasses', href: '#' },
          { name: 'Hats', href: '#' },
          { name: 'Belts', href: '#' },
        ],
      },
      {
        id: 'brands',
        name: 'Brands',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
        imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
        items: [
          { name: 'Re-Arranged', href: '#' },
          { name: 'Counterfeit', href: '#' },
          { name: 'Full Nelson', href: '#' },
          { name: 'My Way', href: '#' },
        ],
      },
    ],
  },
]

export default function ProductsBySubcategory() {
  const cat = categories.flatMap(cat => cat.subcategories);
  const products = categories[0].subcategories[0].items


  return (


    <PageComponent>
      <Breadcrumb />

      {/* <div className="grid grid-cols-4 gap-x-2 gap-y-10 sm:grid-cols-6 lg:grid-cols-8 xl:grid-cols-9 xl:gap-x-8 my-10">
          {cat.map((section) => (
            <a key={section.id} href={section.href} className="group flex flex-col items-center">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                <img
                  src={section.imageSrc}
                  alt={section.imageAlt}
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                />

              </div>
              <h3 className="mt-4 text-sm text-gray-700 ">{section.name}</h3>
            </a>

          ))}
        </div>
        <hr /> */}

      <h2 className='flex justify-center p-4' >{categories[0].subcategories[0].name}</h2>
      <p className='flex p-4'>Subcategory Description</p>

      <Products products={products}></Products>

    </PageComponent>
  )

}
