import axios, { AxiosError } from 'axios';
import type { GetAllUsersResponse, IUserDto } from '../types/data-contracts';

export const getAllUsers = async ({
  onSuccess,
  onError,
}: {
  onSuccess: (users: IUserDto[]) => void;
  onError: (error: AxiosError) => void;
}) => {
  try {
    const { data } = await axios.get<GetAllUsersResponse>(
      'https://dummyjson.com/users?limit=999'
    );

    onSuccess(data.users);
  } catch (err) {
    onError(err as AxiosError);
  }
};
