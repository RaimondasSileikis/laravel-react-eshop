import { Outlet } from 'react-router-dom'

import Navbar from './NavBar'

export default function PublicLayout() {

  // const { currentUser, setCurrentUser, setUserToken } = UseStateContext()

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

  return (
    <div className="min-h-full">
      <Navbar />
      <Outlet />
    </div>
  )
}
