import { useContext } from 'react';
import { AuthContext } from './config';

export const useCurrentUser = () => {
  const { user } = useContext(AuthContext);

  return user;
};
