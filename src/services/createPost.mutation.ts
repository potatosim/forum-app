import type { AxiosError } from 'axios';
import type { IPostDto } from '../types/data-contracts';
import type { ServiceHandler } from './type';
import axios from 'axios';

export const createPost = async (
  body: Pick<IPostDto, 'title' | 'body' | 'userId'>,
  { onError, onSuccess }: ServiceHandler<IPostDto>
) => {
  try {
    const { data } = await axios.post<IPostDto>(
      `${import.meta.env.VITE_API_URL}/posts`,
      body
    );

    onSuccess(data);

    return data;
  } catch (err) {
    onError(err as AxiosError);
  }
};
