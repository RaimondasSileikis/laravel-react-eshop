import { ArrowTopRightOnSquareIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import TButton from "../../../../shared/TButton";

export default function ProductListItem({ product, handleDeleteProduct }) {
  return (
    <div className="flex flex-col py-4 px-6 shadow-md bg-white hover:bg-gray-50 h-[470px]">
      <img
        src={product.image_url}
        alt={product.title}
        className="w-full h-48 object-cover"
      />
      <h4 className="mt-4 text-lg font-bold">{product.title}</h4>
      <h4 className="overflow-hidden flex-1">{product.description}</h4>
      <div className="flex justify-between items-center mt-3">
        <TButton to={`edit/${product.id}`}>
          <PencilIcon className="w-5 h-5 mr-2" />
          Edit
        </TButton>
        <div className="flex items-center">
          <TButton to={`${product.id}`} circle link>
            <ArrowTopRightOnSquareIcon className="w-5 h-5" />
          </TButton>
          {product.id && (
            <TButton onClick={() => handleDeleteProduct(product.id)} circle link color="red">
              <TrashIcon className="w-5 h-5" />
            </TButton>
          )}
        </div>
      </div>
    </div>
  )
}
