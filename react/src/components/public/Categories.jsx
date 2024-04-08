import { NavLink, useSearchParams } from 'react-router-dom'

export default function Categories({categories}) {
  const [searchParams] = useSearchParams();

  const searchQuery = (searchParams.get('q') || searchParams.get('cq') || '');
  const searchValueBySlug = searchQuery ? `/?cq=${searchQuery}` : '';


  return (
    <div className="grid grid-cols-4 p-4 gap-x-2 gap-y-10 sm:grid-cols-6 lg:grid-cols-8 xl:grid-cols-9 xl:gap-x-8 my-10">
      {categories && categories.map((category) => (
        <NavLink
          key={category.id} to={`/${category.slug}${searchValueBySlug}`} className="group flex flex-col items-center">
          <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
            <img
              src={category.image_url}
              alt={category.image_alt}
              className="h-full w-full object-cover object-center group-hover:opacity-75"
            />
          </div>
          <h3 className="mt-4 text-sm text-gray-700 ">{category.title}</h3>
        </NavLink>
      ))}
    </div>
  )
}
