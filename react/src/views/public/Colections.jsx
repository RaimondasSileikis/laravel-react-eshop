import PageComponent from '../../components/public/PageComponent'

const colections = [
  {
    id: 'women',
    name: 'Women',

    categories: [
      {
        id: 'clothing',
        name: 'Clothing',
        href: '#',
        price: '$35',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
        imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',

      },
      {
        id: 'accessories',
        name: 'Accessories',
        href: '#',
        price: '$48',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
        imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
      },
      {
        id: 'brands',
        name: 'Brands',
        href: '#',
        price: '$35',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg',
        imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
      },
    ],
  },
  {
    id: 'men',
    name: 'Men',

    categories: [
      {
        id: 'clothing',
        name: 'Clothing',
        href: '#',
        price: '$35',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg',
        imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
      },
      {
        id: 'accessories',
        name: 'Accessories',
        href: '#',
        price: '$89',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg',
        imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
      },
      {
        id: 'brands',
        name: 'Brands',
        href: '#',
        price: '$35',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg',
        imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
      },
    ],
  },
]



export default function Colections() {
  return (
    <PageComponent>

      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Colections</h2>
          <div>
            {colections.map((colection) => (
              <>
                <h2 className='flex justify-center p-4' >{colection.name}</h2>

                <div className="grid grid-cols-3 gap-x-2 gap-y-10 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 xl:gap-x-8 mb-10">
                  {colection.categories.map((categorie) => (
                    <a key={categorie.id} href={categorie.href} className="group flex flex-col items-center">
                      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                        <img
                          src={categorie.imageSrc}
                          alt={categorie.imageAlt}
                          className="h-full w-full object-cover object-center group-hover:opacity-75"

                        />

                      </div>
                      <h3 className="mt-4 text-sm text-gray-700 ">{categorie.name}</h3>

                    </a>

                  ))}
                </div>
                <hr />

              </>
            ))}

          </div>


        </div>
      </div>

    </PageComponent>
  )
}
