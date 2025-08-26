import type { AxiosError } from 'axios';
import type { IPostDto } from '../types/data-contracts';
import type { ServiceHandler } from './type';
import axios from 'axios';

export const deletePost = async (
  id: string,
  { onError, onSuccess }: ServiceHandler<IPostDto>
) => {
  try {
    const { data } = await axios.delete(
      `${import.meta.env.VITE_API_URL}/posts/${id}`
    );

    onSuccess(data);

    return data;
  } catch (err) {
    onError(err as AxiosError);
  }
};
