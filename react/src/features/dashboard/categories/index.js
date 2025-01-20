// features/dashboard/categories/index.js

// Export thunks
export { fetchCategories, fetchAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory } from "./categoriesSlice";

// Export reducers and actions
export { setAllCategories } from "./categoriesSlice";
export { default as categoriesReducer } from "./categoriesSlice";

// Export pages
export { default as CategoriesList } from "./pages/CategoriesList";
export { default as CategoryCreate } from "./pages/CategoryCreate";
export { default as CategoryEdit } from "./pages/CategoryEdit";
export { default as CategoryDetail } from "./pages/CategoryDetail";
