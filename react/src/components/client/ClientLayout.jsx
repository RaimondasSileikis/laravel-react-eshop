import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useStateContext } from '../../contexts/ContextProvider'


export default function ClientLayout() {
  const { userToken} = useStateContext();

console.log('client lay', userToken);
  const location = useLocation()
  const pathname = location?.state?.pathname

  if (!userToken) {
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
