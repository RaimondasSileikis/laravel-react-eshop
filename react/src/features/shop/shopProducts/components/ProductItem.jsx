import { NavLink } from "react-router-dom";

export default function ProductItem({ product }) {

  const { slug, title, price, image_url, image_alt } = product || {}

  return (
    <NavLink to={slug} className="group">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
        <img
          src={image_url}
          alt={image_alt}
          className="h-full w-full object-cover object-center group-hover:opacity-75"
        />
      </div>
      <h3 className="mt-4 text-sm text-gray-700">{title}</h3>
      <p className="mt-1 text-lg font-medium text-gray-900">{price}</p>
    </NavLink>
  )
}
