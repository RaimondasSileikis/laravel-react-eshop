import { Navigate, Outlet } from 'react-router-dom'
import Header from '../public/Header'

export default function ClientLayout() {
  // const { currentUser, userToken} = UseStateContext();

  // const userToken = '123';
  // const userTypeAdmin = 1

  // if (!userToken || userTypeAdmin) {
  //   return (
  //     <Navigate to='/' />
  //   )
  // }


  return (
    <div className="min-h-full">ClientLayout
      <Header />
      <Outlet />
    </div>
  )
}
