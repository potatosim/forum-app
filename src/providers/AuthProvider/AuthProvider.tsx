import { useMemo, useState } from 'react';
import { Outlet } from 'react-router-dom';
import type { IUserDto } from '../../types/data-contracts';
import { AuthContext } from './config';

const AuthProvider = () => {
  const [user, setUser] = useState<IUserDto | null>(null);

  const memoizedContextValue = useMemo(() => ({ user, setUser }), [user]);

  return (
    <AuthContext value={memoizedContextValue}>
      <Outlet />
    </AuthContext>
  );
};

export default AuthProvider;
