import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RequireAuth = ({ children, requiresAdmin, requiresPrivate }) => {
  const { userToken, currentUser } = useSelector((state) => state.auth);

  if (requiresAdmin && !userToken) {
    return <Navigate to='/login' />;
  }

  if (requiresAdmin && currentUser && !currentUser.isAdmin) {
    return <Navigate to='/' />;
  }

  if (requiresPrivate && !userToken) {
    return <Navigate to='/' />;
  }

  if (!requiresAdmin && currentUser && currentUser.isAdmin) {
    return <Navigate to='/dashboard' />;
  }

  return children;
};

export default RequireAuth;
