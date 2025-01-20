import { Outlet } from 'react-router-dom'
import Navbar from './ShopNavbar';

export default function ShopPrivateLayout() {

  return (
    <div className="min-h-full">
      <Navbar />
      <Outlet />
    </div>
  )
}
