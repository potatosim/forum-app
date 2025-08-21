import axios, { AxiosError } from 'axios';
import type { GetAllPostsResponse } from '../types/data-contracts';

export const getPosts = async ({
  onSuccess,
  onError,
}: {
  onSuccess: (posts: GetAllPostsResponse['posts']) => void;
  onError: (error: AxiosError) => void;
}) => {
  try {
    const { data } = await axios.get<GetAllPostsResponse>(
      'https://dummyjson.com/posts'
    );

    onSuccess(data.posts);

    return data.posts;
  } catch (err) {
    onError(err as AxiosError);
  }
};
