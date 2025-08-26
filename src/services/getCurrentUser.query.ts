import { AxiosError } from 'axios';
import type { IUserDto } from '../types/data-contracts';
import axios from 'axios';
import { LocalStorageKeys } from '../enum/LocalStorageKeys';

export const getCurrentUser = async ({
  onSuccess,
  onError,
}: {
  onSuccess: (user: IUserDto) => void;
  onError: (error: AxiosError) => void;
}) => {
  try {
    const currentUserId = localStorage.getItem(LocalStorageKeys.CurrentUserId);

    if (!currentUserId) {
      onError(new AxiosError('Session expired'));
      return;
    }

    const { data } = await axios.get<IUserDto>(
      `${import.meta.env.VITE_API_URL}/users/${currentUserId}`
    );

    onSuccess(data);

    return data;
  } catch (err) {
    onError(err as AxiosError);
  }
};
