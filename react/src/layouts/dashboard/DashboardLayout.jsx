import { Outlet } from 'react-router-dom'
import DashboardNavBar from './DashboardNavBar';

export default function DashboardLayout() {

  return (
    <div className="min-h-full">
      <DashboardNavBar />
      <Outlet />
    </div>
  )
}
