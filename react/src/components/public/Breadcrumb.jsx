import { NavLink, useParams } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider"
import { useEffect, useState } from "react";


export default function Breadcrumb({productGroupSlug = null}) {
  const [nav, setNav] = useState({ breadcrumbs: [] })
  const { eshopNavigation } = useStateContext();
  const { groupSlug } = useParams();
const [currentSlug, setCurrentSlug] = useState(groupSlug)


useEffect(() => {
  if (productGroupSlug) {
    setCurrentSlug(productGroupSlug);
  }
}, [productGroupSlug, setCurrentSlug]);

useEffect(() => {
  setNav(findGroupSlag(eshopNavigation.collections, currentSlug));
}, [eshopNavigation.collections, currentSlug]);

  function findGroupSlag(collections, selectedSlug) {
    const breadcrumbs = []
    for (const collection of collections) {
      if (collection.id === selectedSlug) {
        breadcrumbs.push({ id: collection.id, name: collection.name, to: `/${collection.id}` });
        return { selectedItem: selectedSlug, child: collection.id, breadcrumbs };
      }
      if (collection.categories) {
        const foundCategory = collection.categories.find(category => category.id === selectedSlug);
        if (foundCategory) {
          breadcrumbs.push({ id: collection.id, name: collection.name, to: `/${collection.id}` });
          breadcrumbs.push({ id: foundCategory.id, name: foundCategory.name, to: `/${foundCategory.id}` });
          return { selectedItem: collection.id, child: foundCategory.name, parent: collection.name, breadcrumbs };
        }
        for (const category of collection.categories) {
          if (category.sections) {
            const foundSection = category.sections.find(section => section.id === selectedSlug);
            if (foundSection) {
              breadcrumbs.push({ id: collection.id, name: collection.name, to: `/${collection.id}` });
              breadcrumbs.push({ id: category.id, name: category.name, to: `/${category.id}` });
              breadcrumbs.push({ id: foundSection.id, name: foundSection.name, to: `/${foundSection.id}` });
              return { selectedItem: selectedSlug, child: foundSection.name, parent: category.name, grandparent: collection.name, breadcrumbs };
            }
          }
        }
      }
    }
    return { breadcrumbs };
  }

  return (
    <nav aria-label="Breadcrumb">
      <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        {nav.breadcrumbs.map((breadcrumb, index) => (
          <li key={index}>

            <div className="flex items-center">
              {index !== 0 && (
                <svg
                  width={16}
                  height={20}
                  viewBox="0 0 16 20"
                  fill="currentColor"
                  aria-hidden="true"
                  className="h-5 w-4 text-gray-300"
                >
                  <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                </svg>
              )}
              <NavLink to={breadcrumb.to} className="ml-2 text-sm font-medium text-gray-900 hover:underline hover:text-blue-400">
                {breadcrumb.name}
              </NavLink>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  )
}
