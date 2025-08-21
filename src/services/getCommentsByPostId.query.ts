import axios, { AxiosError } from 'axios';
import type {
  GetAllCommentsResponse,
  ICommentDto,
} from '../types/data-contracts';

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
    const { data } = await axios.get<GetAllCommentsResponse>(
      `https://dummyjson.com/comments/post/${id}`
    );

    onSuccess(data.comments);
  } catch (err) {
    onError(err as AxiosError);
  }
};
