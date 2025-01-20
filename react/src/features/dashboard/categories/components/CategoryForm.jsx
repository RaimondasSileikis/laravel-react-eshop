import { useState } from "react";
import TButton from "../../../../shared/TButton";

export default function CategoryForm({ onSubmit, initialValues = {}, isLoading, categories }) {
  const [formData, setFormData] = useState({
    title: initialValues.title || '',
    description: initialValues.description || '',
    status: initialValues.status || 'Active',
    parent_id: initialValues.parent?.id || null,
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(initialValues.image_url || null);

  const handleInputChange = (e) => {
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
    const submitFormData = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null) submitFormData.append(key, formData[key]);
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
            onChange={handleInputChange}
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
            onChange={handleInputChange}
            className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
            rows="4"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            name="status"
            id="status"
            value={formData.status}
            onChange={handleInputChange}
            className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        {formData.parent_id && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Subcategory</label>
            <select
              name="parent_id"
              value={formData.parent_id || ""}
              onChange={handleInputChange}
              className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
            >
              {categories.map((child) => (
                <option key={child.id} value={child.id}>
                  {child.title}
                </option>
              ))}
            </select>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700">Image</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleInputChange}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
          />
        </div>
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Current Category"
            className="mt-2 h-20 w-20 object-cover rounded-md"
          />
        )}
      </div>
      <div className="mt-6 flex justify-center items-center space-x-4 ">
        <TButton color="red" to='/dashboard/categories'>
          cancel
        </TButton>
        <TButton type="submit" color="green" disabled={isLoading}>
          {isLoading ? 'Submitting...' : 'Save Category'}
        </TButton>
      </div>
    </form>
  );
}
