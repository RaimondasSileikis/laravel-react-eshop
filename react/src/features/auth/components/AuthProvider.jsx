import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentUser } from '../authSlice';

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { userToken, currentUser } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userToken && !currentUser) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch, userToken, currentUser]);

  return children;
};

export default AuthProvider;
