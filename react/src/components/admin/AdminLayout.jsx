
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { useStateContext } from '../../contexts/ContextProvider'
import { adminAxiosClient } from '../../axios';
import { useEffect } from 'react';

export default function AdminLayout() {
  const { currentAdmin, setCurrentAdmin, adminToken, setAdminToken } = useStateContext();

  useEffect(() => {
    adminAxiosClient.get('/get-admin')
      .then(({ data }) => {
        setCurrentAdmin(data)
      });
  }, [setCurrentAdmin]);


  if (!adminToken) {
    return (
      <Navigate to='/adminlogin' />
    )
  }

  const logout = (e) => {
    e.preventDefault();
    adminAxiosClient.post('/admin-logout')
      .then(res => {
        setCurrentAdmin({});
        setAdminToken(null);
      });
  }


  return (
    <div>AdminLayout
      <h1>admin:  {currentAdmin && currentAdmin.email}</h1>
      <button onClick={logout}>logout</button>
      <Outlet />
    </div>
  )
}
