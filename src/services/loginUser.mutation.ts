import { AxiosError } from 'axios';
import type { ILoginUserDto, IUserDto } from '../types/data-contracts';
import type { ServiceHandler } from './type';
import axios from 'axios';

export const loginUser = async (
  body: ILoginUserDto,
  { onError, onSuccess }: ServiceHandler<IUserDto>
) => {
  try {
    const { data } = await axios.get<IUserDto[]>(
      `${import.meta.env.VITE_API_URL}/users?username=${body.username}`
    );

    if (!data || !data.length) {
      onError(new AxiosError('User with such username/password is not found'));
      return;
    }

    const user = data[0];

    if (user.password !== body.password) {
      onError(new AxiosError('User with such username/password is not found'));
      return;
    }

    onSuccess(user);

    return data;
  } catch (err) {
    onError(err as AxiosError);
  }
};
