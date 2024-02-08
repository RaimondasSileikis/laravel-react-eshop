import {  Outlet } from 'react-router-dom'
import { useStateContext } from '../../contexts/ContextProvider'


export default function ClientLayout() {
  const { currentUser, userToken} = useStateContext();

  // const userToken = '123';
  // const userTypeAdmin = 1

  // if (!userToken || userTypeAdmin) {
  //   return (
  //     <Navigate to='/' />
  //   )
  // }


  return (
    <div className="min-h-full">ClientLayout

      <Outlet />
    </div>
  )
}
