import type { AxiosError } from 'axios';
import type { IUserDto } from '../types/data-contracts';
import axios from 'axios';

export const getCurrentUser = async ({
  onSuccess,
  onError,
}: {
  onSuccess: (user: IUserDto) => void;
  onError: (error: AxiosError) => void;
}) => {
  try {
    const accessToken = localStorage.getItem('accessToken');

    const { data } = await axios.get<IUserDto>(
      'https://dummyjson.com/user/me',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    onSuccess(data);

    return data;
  } catch (err) {
    onError(err as AxiosError);
  }
};
