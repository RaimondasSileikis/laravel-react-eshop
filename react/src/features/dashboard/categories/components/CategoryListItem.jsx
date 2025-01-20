import { ArrowTopRightOnSquareIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import TButton from "../../../../shared/TButton";


export default function CategoryListItem({ category, handleDeleteCategory }) {
  return (

    <div className="flex flex-col py-4 px-6 shadow-md bg-white hover:bg-gray-50 h-[470px]">
      <img
        src={category.image_url}
        alt={category.title}
        className="w-full h-48 object-cover"
      />
      <h4 className="mt-4 text-lg font-bold">{category.title}</h4>
      <h4 className="overflow-hidden flex-1">{category.description}</h4>
      <div className="flex justify-between items-center mt-3">
        <TButton to={`edit/${category.id}`}>
          <PencilIcon className="w-5 h-5 mr-2" />
          Edit
        </TButton>
        <div className="flex items-center">
          <TButton to={`${category.id}`} circle link>
            <ArrowTopRightOnSquareIcon className="w-5 h-5" />
          </TButton>
          {category.id && (
            <TButton onClick={() => handleDeleteCategory(category.id)} circle link color="red">
              <TrashIcon className="w-5 h-5" />
            </TButton>
          )}
        </div>
      </div>
    </div>
  )
}
