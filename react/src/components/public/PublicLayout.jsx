import { Navigate, Outlet } from 'react-router-dom'
import Navbar from './NavBar'
import { useStateContext } from '../../contexts/ContextProvider';
import { useEffect, useState } from 'react';
import { userAxiosClient } from '../../axios';
export default function PublicLayout() {

  const { currentUser, userToken, setCurrentUser, setUserToken, categoriesTree, setCategoriesTree } = useStateContext()

  // useEffect(() => {
  //   axiosClient.get('/eshop-navigation')
  //     .then(({ data }) => {
  //       setEshopNavigation(data)

  //     })
  // }, [setEshopNavigation]);
  console.log('public', userToken, currentUser);

  useEffect(() => {
    if (userToken) {
      userAxiosClient.get('/get-user')
        .then(({ data }) => {
          setCurrentUser(data);
        })
    }


  }, [setCurrentUser, userToken]);


  const logout = (e) => {
    e.preventDefault();
    userAxiosClient.post('/user-logout')
      .then(res => {
        setCurrentUser({});
        setUserToken(null);
      });
  }
  useEffect(() => {
    userAxiosClient.get('/tree')
      .then(({ data }) => {

        setCategoriesTree(data);

      })
  }, [ setCategoriesTree]);
  console.log('tree', categoriesTree);

  return (
    <div className="min-h-full">
      <Navbar logout={logout} />
      {/* <Cart ></Cart> */}
      <Outlet />
    </div>
  )
}
