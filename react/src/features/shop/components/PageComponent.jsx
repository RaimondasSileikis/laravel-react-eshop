import Categories from "../shopCategories/components/Categories";
import Breadcrumb from "./Breadcrumb";

export default function PageComponent({ title = '', description = '', categories, children }) {
  return (
    <>
      <header className="bg-white">
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <Breadcrumb />
          <Categories categories={categories} />
          <h3 className='flex font-semibold text-lg p-4 border-t border-gray-200 '>{title}</h3>
          <p className='flex p-4'>{description}</p>
        </div>
      </header>
      <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            {children}
          </div>
      </main>
    </>
  )
}
