import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../../services/getCurrentUser.query';
import { AppRoutes } from '../../enum/AppRoutes';
import { CircularProgress } from '@mui/material';
import type { IUserDto } from '../../types/data-contracts';
import { AuthContext } from './config';

const AuthProvider = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<IUserDto | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCurrentUser({
      onSuccess: (currentUser) => {
        setUser(currentUser);
        setIsLoading(false);
      },
      onError: () => {
        navigate(AppRoutes.Login);
      },
    });
  }, []);

  if (isLoading && !user) {
    return <CircularProgress />;
  }

  return (
    <AuthContext value={{ user }}>
      <Outlet />
    </AuthContext>
  );
};

export default AuthProvider;
