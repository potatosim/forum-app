import { createContext, type Dispatch, type SetStateAction } from 'react';
import type { IUserDto } from '../../types/data-contracts';

export const AuthContext = createContext<{
  user: IUserDto | null;
  setUser: Dispatch<SetStateAction<IUserDto | null>>;
}>({ user: null, setUser: () => {} });
