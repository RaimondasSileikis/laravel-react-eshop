import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProductById, updateProduct } from '../productsSlice';
import ProductForm from '../components/ProductForm';
import { fetchCategories } from '../../categories/categoriesSlice';

export default function ProductEdit() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productById } = useSelector((state) => state.products);
  const { categories, isLoading } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(getProductById(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(fetchCategories({all: true}));
  }, [dispatch]);

  if (isLoading || !productById) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  const handleUpdate = (updatedProduct) => {
    updatedProduct.append('_method', 'patch');
    dispatch(updateProduct({ id, product: updatedProduct }))
    navigate('/dashboard/products');
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-center mt-6 mb-4">Edit Product</h2>
      <ProductForm
        initialValues={productById}
        onSubmit={handleUpdate}
        isLoading={isLoading}
        categories={categories}
      />
    </div>
  );
}
