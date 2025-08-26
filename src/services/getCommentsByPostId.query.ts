import axios, { AxiosError } from 'axios';
import type { ICommentDto } from '../types/data-contracts';

export const getCommentsByPostId = async ({
  id,
  onSuccess,
  onError,
}: {
  id: string;
  onSuccess: (comments: ICommentDto[]) => void;
  onError: (error: AxiosError) => void;
}) => {
  try {
    const { data } = await axios.get<ICommentDto[]>(
      `${import.meta.env.VITE_API_URL}/comments?postId=${id}`
    );

    onSuccess(data);
  } catch (err) {
    onError(err as AxiosError);
  }
};
