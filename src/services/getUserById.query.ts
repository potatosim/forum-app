import { AxiosError } from 'axios';
import type { IUserDto } from '../types/data-contracts';
import axios from 'axios';

export const getUserById = async ({
  id,
  onSuccess,
  onError,
}: {
  id: string;
  onSuccess: (user: IUserDto) => void;
  onError: (error: AxiosError) => void;
}) => {
  try {
    const { data } = await axios.get<IUserDto>(
      `${import.meta.env.VITE_API_URL}/users/${id}`
    );

    onSuccess(data);

    return data;
  } catch (err) {
    onError(err as AxiosError);
  }
};
