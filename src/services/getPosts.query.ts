import axios, { AxiosError } from 'axios';
import type { IGetPaginationPosts } from '../types/data-contracts';

export const getPosts = async ({
  page,
  onSuccess,
  userId,
  onError,
}: {
  page: number;
  userId?: string | null;
  onSuccess: (posts: IGetPaginationPosts) => void;
  onError: (error: AxiosError) => void;
}) => {
  try {
    const { data } = await axios.get<IGetPaginationPosts>(
      `${import.meta.env.VITE_API_URL}/posts`,
      {
        params: {
          _page: page,
          userId,
        },
      }
    );

    onSuccess(data);
    return data;
  } catch (err) {
    onError(err as AxiosError);
  }
};
