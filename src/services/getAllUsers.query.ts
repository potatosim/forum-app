import axios, { AxiosError } from 'axios';
import type { IUserDto } from '../types/data-contracts';

export const getAllUsers = async ({
  onSuccess,
  onError,
}: {
  onSuccess: (users: IUserDto[]) => void;
  onError: (error: AxiosError) => void;
}) => {
  try {
    const { data } = await axios.get<IUserDto[]>(
      `${import.meta.env.VITE_API_URL}/users`
    );

    onSuccess(data);
  } catch (err) {
    onError(err as AxiosError);
  }
};
