import { Outlet } from 'react-router-dom'
import Navbar from './ShopNavbar';

export default function ShopPublicLayout() {

  return (
    <div className="min-h-full">
      <Navbar />
      <Outlet />
    </div>
  )
}
