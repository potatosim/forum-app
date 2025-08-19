import { createContext } from 'react';
import type { IUserDto } from '../../types/data-contracts';

export const AuthContext = createContext<{
  user: IUserDto | null;
}>({ user: null });
