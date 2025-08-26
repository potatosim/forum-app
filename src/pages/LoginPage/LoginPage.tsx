import { useState } from 'react';
import LoginForm from '../../components/LoginForm';
import type { ILoginUserDto } from '../../types/data-contracts';
import { loginUser } from '../../services/loginUser.mutation';
import { useAuthContext } from '../../providers/AuthProvider/hooks';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../enum/AppRoutes';
import { LocalStorageKeys } from '../../enum/LocalStorageKeys';

const LoginPage = () => {
  const navigate = useNavigate();
  const { setUser } = useAuthContext();
  const [error, setError] = useState('');

  const handleSubmit = (data: ILoginUserDto) => {
    loginUser(data, {
      onSuccess: (user) => {
        localStorage.setItem(LocalStorageKeys.CurrentUserId, user.id);
        setUser(user);
        navigate(AppRoutes.Home);
      },
      onError: (error) => {
        setError(error.message);
      },
    });
  };

  return <LoginForm error={error} onSubmit={handleSubmit} />;
};

export default LoginPage;
