import { useEffect, } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProductById } from '../productsSlice';
import TButton from '../../../../shared/TButton';

export default function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { productById, isLoading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProductById(id));
  }, [dispatch, id]);

  if (isLoading) return <div className="text-center text-lg">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <img
        src={productById.image_url}
        alt={productById.title}
        className="w-full h-64 object-cover rounded-md mb-6"
      />
      <h3 className="text-3xl text-gray-800 mb-4"><span className='text-gray-500'>Title: </span>{productById.title}</h3>
      <p className="text-sm text-gray-800 mb-4"><span className='text-gray-500'>Description: </span>{productById.description}</p>
      <h3 className="text-sm text-gray-800 mb-4"><span className='text-gray-500'>Price: </span>${productById.price}</h3>
      <h3 className="text-sm text-gray-800 mb-4"><span className='text-gray-500'>Category: </span>{productById.category?.title.toUpperCase()}</h3>
      <div className="text-sm text-gray-500 mb-4">Status: {productById.status}</div>
      <div className="text-sm text-gray-500 mb-4">Featured: {productById.featured}</div>
      <div className="flex justify-center space-x-4">
        <TButton to="/dashboard/products">
          Back
        </TButton>
        <TButton to={`/dashboard/products/edit/${id}`} color="red">
          Edit Product
        </TButton>
      </div>
    </div>
  );
}
