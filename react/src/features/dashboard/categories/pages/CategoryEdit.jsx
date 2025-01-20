import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchCategories, getCategoryById, updateCategory } from '../categoriesSlice';
import CategoryForm from '../components/CategoryForm';

export default function CategoryEdit() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categoryById, isLoading } = useSelector((state) => state.categories);
  const { categories } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(getCategoryById(id));
  }, [dispatch, id]);

  useEffect(() => {
      dispatch(fetchCategories({all: true}));
  }, [dispatch]);

  if (isLoading || !categoryById) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  const grandParentId = categoryById?.parent?.parent?.id || null;
  const filteredCategories = grandParentId
  ? categories?.filter((cat) => cat.parent?.id == grandParentId)
  : categories?.filter((cat) => cat.parent === null) || [];


  const handleUpdate = (updatedCategory) => {
    updatedCategory.append('_method', 'patch');
    dispatch(updateCategory({ id, category: updatedCategory }))
    navigate('/dashboard/categories');
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-center mt-6 mb-4">Edit Category</h2>
      <CategoryForm
      initialValues={categoryById}
      onSubmit={handleUpdate}
      isLoading={isLoading}
      categories={filteredCategories} />
    </div>
  );
}
