import { Navigate, Outlet } from 'react-router-dom'
import Header from './Header'

export default function PublicLayout() {

  return (
    <div className="min-h-full">PublicLayout
      <Header />
      <Outlet />
    </div>
  )
}
