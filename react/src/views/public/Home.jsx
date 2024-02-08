import { NavLink } from "react-router-dom"
import { useStateContext } from "../../contexts/ContextProvider"

export default function Home() {
  const { eshopNavigation } = useStateContext()

  return (
    <div className="bg-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
          <div className="flex justify-between text-2xl font-bold text-gray-900">
            <h2 className="text-2xl font-bold text-gray-900">Shop by Colections</h2>
          </div>
          <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
            {eshopNavigation.collections.map((callout) => (
              <div key={callout.name} className="group relative">
                <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                  <img
                    src={callout.imageSrc}
                    alt={callout.imageAlt}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <h3 className="mt-6 text-sm text-gray-500">
                  <NavLink
                    to={callout.id}>
                    <span className="absolute inset-0" />
                    {callout.name}
                  </NavLink>

                </h3>
                <p className="text-base font-semibold text-gray-900">{callout.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
