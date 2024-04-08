
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { useStateContext } from '../../contexts/ContextProvider'
import {adminAxiosClient} from '../../axios';
import { useEffect } from 'react';

export default function LoginAdminLayout() {
const { currentAdmin, setCurrentAdmin, setAdminToken } = useStateContext();
const navigate = useNavigate()


const adminToken = localStorage.getItem("ADMIN_TOKEN");

  if (adminToken ) {
    return (
      <Navigate to='/admin' />
    )
  }

  console.log('loginadmin', adminToken);

  return (
    <div>LoginAdminLayout

       <Outlet/>
    </div>
  )
}
