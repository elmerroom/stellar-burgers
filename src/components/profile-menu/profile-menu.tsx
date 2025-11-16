import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { logout, getIsAuth } from '../../services/features/authSlice';
import { useEffect } from 'react';

export const ProfileMenu: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isAuth = useSelector(getIsAuth);

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    if (!isAuth) {
      navigate('/login');
    }
  }, [navigate, isAuth]);

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
