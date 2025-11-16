import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { login, getErrorMessage } from '../../services/features/authSlice';
import { useDispatch, useSelector } from '../../services/store';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const errorMessage = useSelector(getErrorMessage);
  const logined = {
    email,
    password
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    dispatch(login(logined));
  };

  return (
    <LoginUI
      errorText={errorMessage ?? ''}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
