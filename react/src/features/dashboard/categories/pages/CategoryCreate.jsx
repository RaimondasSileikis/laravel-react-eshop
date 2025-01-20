import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { createCategory, fetchCategories } from "../categoriesSlice";
import CategoryForm from "../components/CategoryForm";

export default function CategoryCreate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const parentId = searchParams.get('pId') || null;
  const grandParentId = searchParams.get('gpId') || null;
  const { categories } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories({ all: true }));
  }, [dispatch]);

  const filteredCategories = grandParentId
    ? categories?.filter((cat) => cat.parent?.id == grandParentId)
    : categories?.filter((cat) => cat.parent === null) || [];


  const handleSubmit = (formData) => {
    dispatch(createCategory(formData));
    navigate('/dashboard/categories');
  };

  return (
    <div className="p-6 bg-white rounded-md shadow-md">
      <h2 className="text-xl font-bold mb-4">Create New Category</h2>
      <CategoryForm
        onSubmit={handleSubmit}
        initialValues={{ parent: { id: parentId } }}
        categories={filteredCategories}
      />
    </div>
  );
}
