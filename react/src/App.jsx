import { Provider } from "react-redux";

import store from "./store";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { ToastContainer } from "react-toastify";

export default function App() {

  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router}>
        </RouterProvider>
      </Provider>

    <ToastContainer />
    </>
  )
}
