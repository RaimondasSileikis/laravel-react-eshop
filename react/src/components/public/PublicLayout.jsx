import { Outlet } from 'react-router-dom'

import Navbar from './NavBar'
import { useStateContext } from '../../contexts/ContextProvider';
import Cart from './Cart'
export default function PublicLayout() {

  const { currentUser, setCurrentUser, setUserToken, eshopNavigation, setEshopNavigation } = useStateContext()

  // useEffect(() => {
  //   axiosClient.get('/me')
  //     .then(({ data }) => {
  //       setCurrentUser(data)

  //     })
  // }, [setCurrentUser]);


  // const logout = (e) => {
  //   e.preventDefault();
  //   axiosClient.post('/logout')
  //     .then(res => {
  //       setCurrentUser({});
  //       setUserToken(null);
  //     });
  // }

    // useEffect(() => {
  //   axiosClient.get('/eshop-navigation')
  //     .then(({ data }) => {
  //       setEshopNavigation(data)

  //     })
  // }, [setEshopNavigation]);

  const logout = (e) => {
    e.preventDefault();
    // axiosClient.post('/logout')
    //   .then(res => {
    //     setCurrentUser({});
    //     setUserToken(null);

      // });
 console.log('logout');
  }

  return (
    <div className="min-h-full">
      <Navbar currentUser={currentUser} logout={logout} />
      {/* <Cart ></Cart> */}
      <Outlet />
    </div>
  )
}
