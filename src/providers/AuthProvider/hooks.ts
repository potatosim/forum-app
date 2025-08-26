import { useContext } from 'react';
import { AuthContext } from './config';

export const useAuthContext = () => {
  const authContext = useContext(AuthContext);

  return authContext;
};
