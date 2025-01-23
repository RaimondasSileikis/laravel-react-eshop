import { useState } from "react";
import { toast } from "react-toastify";
import useCategories from "../hooks/useCategories";
import TButton from "../../../../shared/TButton";

export default function ProductForm({
  onSubmit,
  initialValues = {},
  isLoading,
  categories = [],

}) {
  const [formData, setFormData] = useState({
    title: initialValues.title || '',
    description: initialValues.description || '',
    price: parseFloat(initialValues.price) || 0,
    status: initialValues.status || 'Active',
    featured: initialValues.featured || 'Inactive',
    image: null,
    category_id: initialValues.category?.id || null,
  });

  const [imagePreview, setImagePreview] = useState(initialValues.image_url || null);

  const {
    selectedCategories,
    filteredCategories,
    finalCategoryId,
    handleCategoryChange,
  } = useCategories(categories, formData.category_id, setFormData);


  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'file') {
      const file = files[0];
      setFormData({ ...formData, [name]: file });
      if (file) {
        setImagePreview(URL.createObjectURL(file));
      }
    } else if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (categories.length > 0 && !finalCategoryId) {
      toast.error('Please select a valid category.');
      return;
    }
    const submitFormData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) {
        submitFormData.append(key, value);
      }
    });
    onSubmit(submitFormData);
  };

  return (
    <form onSubmit={handleSubmit} method="put" encType="multipart/form-data" className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            id="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
            rows="4"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Price</label>
          <input
            type="number"
            name="price"
            id="price"
            min="0"
            value={formData.price}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
            required
          />
        </div>
        {filteredCategories.map((options, level) => (
          <div key={level}>
            <label className="block text-sm font-medium text-gray-700">
              Category Level {level + 1}
            </label>
            <select
              value={selectedCategories[level]?.id || ""}
              onChange={(e) => handleCategoryChange(level, parseInt(e.target.value, 10))}
              className="w-full mt-1 p-2 border rounded-md"
            >
              {!selectedCategories[level] && <option value="">Select a category</option>}
              {options.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.title}
                </option>
              ))}
            </select>
          </div>
        ))}

        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            name="status"
            id="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Featured</label>
          <select
            name="featured"
            id="featured"
            value={formData.featured}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Image</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
          />
        </div>
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Current product"
            className="mt-2 h-20 w-20 object-cover rounded-md"
          />
        )}
      </div>
      <div className="mt-6 flex justify-center items-center space-x-4 ">
        <TButton color="red" to='/dashboard/products'>
          cancel
        </TButton>
        <TButton type="submit" color="green" disabled={isLoading}>
          {isLoading ? 'Submitting...' : 'Save Product'}
        </TButton>
      </div>
    </form>
  );
}
