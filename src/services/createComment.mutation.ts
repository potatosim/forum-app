import type { AxiosError } from 'axios';
import type { ICommentDto } from '../types/data-contracts';
import type { ServiceHandler } from './type';
import axios from 'axios';

export const createComment = async (
  body: Omit<ICommentDto, 'id' | 'likes'>,
  { onError, onSuccess }: ServiceHandler<ICommentDto>
) => {
  try {
    const { data } = await axios.post<ICommentDto>(
      `${import.meta.env.VITE_API_URL}/comments`,
      body
    );

    onSuccess(data);

    return data;
  } catch (err) {
    onError(err as AxiosError);
  }
};
