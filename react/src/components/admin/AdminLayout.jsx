import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export default function AdminLayout() {
// const { currentUser, userToken} = UseStateContext();

  // const userToken = '123';
  // const userTypeAdmin = 0

  // if (!userToken || !userTypeAdmin) {
  //   return (
  //     <Navigate to='/login' />
  //   )
  // }

  return (
    <div>AdminLayout
       <Outlet/>
    </div>
  )
}
