import { useEffect, } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getCategoryById } from '../categoriesSlice';
import TButton from '../../../../shared/TButton';

export default function CategoryDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { categoryById, isLoading, error } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(getCategoryById(id));
  }, [dispatch, id]);

  if (isLoading) return <div className="text-center text-lg">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <img
        src={categoryById.image_url}
        alt={categoryById.title}
        className="w-full h-64 object-cover rounded-md mb-6"
      />
      <h3 className="text-3xl text-gray-800 mb-4"><span className='text-gray-500'>Title: </span>{categoryById.title}</h3>
      <p className="text-sm text-gray-800 mb-4"><span className='text-gray-500'>Description: </span>{categoryById.description}</p>
      <h3 className="text-sm text-gray-800 mb-4"><span className='text-gray-500'>Parent category: </span>{categoryById.parent?.title.toUpperCase()}</h3>
      <div className="text-sm text-gray-500 mb-4">Status: {categoryById.status}</div>
      {!categoryById.parent && <div className="text-sm text-gray-500 mb-4">Main Category</div>}
      <div className="flex justify-center space-x-4">
        <TButton to="/categories">
          Back
        </TButton>
        <TButton to={`/dashboard/categories/edit/${id}`} color="red">
          Edit Category
        </TButton>
      </div>
    </div>
  );
}
