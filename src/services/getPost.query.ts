import axios, { AxiosError } from 'axios';
import type { IPostDto } from '../types/data-contracts';

export const getPost = async ({
  id,
  onSuccess,
  onError,
}: {
  id: string;
  onSuccess: (post: IPostDto) => void;
  onError: (error: AxiosError) => void;
}) => {
  try {
    const { data } = await axios.get<IPostDto>(
      `https://dummyjson.com/posts/${id}`
    );

    onSuccess(data);
  } catch (err) {
    onError(err as AxiosError);
  }
};
