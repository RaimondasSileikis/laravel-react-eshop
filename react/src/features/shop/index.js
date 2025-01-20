// features/shop/index.js

// Export thunks
export { fetchCategoriesTree } from "./shopSlice";

// Export reducers and actions
export { default as shopReducer } from "./shopSlice";

// Export components
export { default as Breadcrumb } from "./components/Breadcrumb";
export { default as PageComponent } from "./components/PageComponent";
export { default as SearchBar } from "./components/SearchBar";

// Export pages
export { default as Home} from "./pages/Home";
