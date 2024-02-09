import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useStateContext } from '../../contexts/ContextProvider'


export default function ClientLayout() {
  const { userToken, userTypeAdmin} = useStateContext();

  // const userToken = null;
  // const userTypeAdmin = 1

  const location = useLocation()
  const pathname = location?.state?.pathname

  if (!userToken || userTypeAdmin) {
    const redirectPath = `/login?message=You must login first.&redirectTo=${pathname}`;
    return (
      <>
        {
          pathname ? <Navigate to={redirectPath} />
            : <Navigate to='/' />
        }
      </>
    )
  }


  return (
    <div className="min-h-full">ClientLayout

      <Outlet />
    </div>
  )
}
