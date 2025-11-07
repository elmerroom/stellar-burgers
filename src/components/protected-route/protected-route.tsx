import { useSelector } from '../../services/store';
import {
  getIsAuth,
  getUser,
  getAuthLoading
} from '../../services/features/authSlice';
import { Preloader } from '../ui/preloader';
import { Navigate, useLocation } from 'react-router-dom';
import { FC } from 'react';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  onlyUnAuth,
  children
}) => {
  const isAuthChecked = useSelector(getAuthLoading);
  const isAuth = useSelector(getIsAuth);
  const location = useLocation();

  if (isAuthChecked) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !isAuth) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && isAuth) {
    const from = location.state?.from || { pathname: '/' };

    return <Navigate replace to={from} />;
  }

  return children;
};
