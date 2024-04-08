import { createContext, useContext, useState } from "react";

const StateContext = createContext({
  currentUser: {},
  currentAdmin: {},
  userToken: null,
  adminToken: null,
  products: [],
  categoriesTree: [],
  breadcrumbs: [],
  cartItems: {},



  setCartItems: () => { },
  setBreadcrumbs: () => { },
  setCategoriesTree: () => { },
  setProducts: () => { },
  setCurrentUser: () => { },
  setCurrentAdmin: () => { },
  setUserToken: () => { },
  setAdminToken: () => {},

})



export const ContextProvider = ({ children }) => {


  const [categoriesTree, setCategoriesTree] = useState([])
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  const [currentUser, setCurrentUser] = useState({});
  const [currentAdmin, setCurrentAdmin] = useState({});
  const [userToken, _setUserToken] = useState(localStorage.getItem('USER_TOKEN' || ''));
  const [adminToken, _setAdminToken] = useState(localStorage.getItem('ADMIN_TOKEN' || ''));

  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});


  const setUserToken = (token) => {
    if (token) {
      localStorage.setItem('USER_TOKEN', token)
    } else {
      localStorage.removeItem('USER_TOKEN')
    }
    _setUserToken(token);
  }
  const setAdminToken = (token) => {
    if (token) {
      localStorage.setItem('ADMIN_TOKEN', token)
    } else {
      localStorage.removeItem('ADMIN_TOKEN')
    }
    _setAdminToken(token);
  }


  return (
    <StateContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        userToken,
        setUserToken,
        setProducts,

        currentAdmin,
        setCurrentAdmin,
        adminToken,
        setAdminToken,

        products,
        categoriesTree,
        setCategoriesTree,
        breadcrumbs,
        setBreadcrumbs,
        cartItems,
        setCartItems,

      }}>
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext)
