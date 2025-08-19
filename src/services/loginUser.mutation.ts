import type { AxiosError } from 'axios';
import type {
  ILoginUserDto,
  ILoginUserResponse,
} from '../types/data-contracts';
import type { ServiceHandler } from './type';
import axios from 'axios';

export const loginUser = async (
  body: ILoginUserDto,
  { onError, onSuccess }: ServiceHandler<ILoginUserResponse>
) => {
  try {
    const { data } = await axios.post('https://dummyjson.com/user/login', body);

    onSuccess(data);

    return data;
  } catch (err) {
    onError(err as AxiosError);
  }
};
