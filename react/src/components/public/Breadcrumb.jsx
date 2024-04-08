import { NavLink, useParams } from "react-router-dom";
import { HomeIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from "react";
import { useStateContext } from "../../contexts/ContextProvider";


export default function Breadcrumb() {
  const { categoriesTree } = useStateContext();
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const { categorySlug } = useParams();

  useEffect(() => {
    function buildBreadcrumb(categories, targetSlug) {
      let breadcrumbs = [];

      for (const category of categories) {
        if (category.slug === targetSlug) {
          breadcrumbs.push({ ...category });
          return breadcrumbs;
        }

        if (category.children) {
          const foundInChildren = buildBreadcrumb(category.children, targetSlug);
          if (foundInChildren.length > 0) {
            breadcrumbs.push({ ...category });
            breadcrumbs = breadcrumbs.concat(foundInChildren);
            return breadcrumbs;
          }
        }
      }
      return breadcrumbs;
    }

    setBreadcrumbs(buildBreadcrumb(categoriesTree, categorySlug));
  }, [categoriesTree, categorySlug]);

  return (
    <nav aria-label="Breadcrumb">
      <ol role="list" className="mx-auto flex items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <NavLink to="/" className="ml-2 text-sm  text-gray-400 hover:text-gray-900 ">
          <HomeIcon className="h-6 w-6"/>
        </NavLink>
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={index}>
            <div className="flex items-center">
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
              <NavLink to={`/${breadcrumb.slug}`} className="ml-2 text-sm  text-gray-400 hover:text-gray-900">
                {breadcrumb.title}
              </NavLink>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  )
}
