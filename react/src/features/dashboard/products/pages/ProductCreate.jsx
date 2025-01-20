import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { createProduct } from "../productsSlice";
import { useNavigate } from "react-router-dom";
import ProductForm from "../components/ProductForm";
import { fetchCategories } from "../../categories/categoriesSlice";

export default function ProductCreate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categories, isLoading } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories({all: true}));
  }, [dispatch]);

  if (isLoading) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  const handleSubmit = (formData) => {
    dispatch(createProduct(formData));
    navigate('/dashboard/products');
  };

  return (
    <div className="p-6 bg-white rounded-md shadow-md">
      <h2 className="text-xl font-bold mb-4">Create New Product</h2>
      <ProductForm
        onSubmit={handleSubmit}
        categories={categories}
      />
    </div>
  );
}
