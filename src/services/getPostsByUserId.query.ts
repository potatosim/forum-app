import axios, { AxiosError } from 'axios';
import type { IPostDto } from '../types/data-contracts';

export const getPostByUserId = async ({
  id,
  onSuccess,
  onError,
}: {
  id: string;
  onSuccess: (post: IPostDto[]) => void;
  onError: (error: AxiosError) => void;
}) => {
  try {
    const { data } = await axios.get<IPostDto[]>(
      `${import.meta.env.VITE_API_URL}/posts`,
      {
        params: {
          userId: id,
        },
      }
    );

    onSuccess(data);
  } catch (err) {
    onError(err as AxiosError);
  }
};
