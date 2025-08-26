import type { AxiosError } from 'axios';
import type { IUserDto } from '../types/data-contracts';
import axios from 'axios';

export const changeReactions = async ({
  user,
  postId,
  reaction,
  onSuccess,
  onError,
}: {
  user: IUserDto;
  postId: string;
  reaction: IUserDto['postReactions'][string];
  onSuccess: (users: IUserDto) => void;
  onError: (error: AxiosError) => void;
}) => {
  try {
    const { data } = await axios.patch<IUserDto>(
      `${import.meta.env.VITE_API_URL}/users/${user.id}`,
      {
        postReactions: {
          ...user.postReactions,
          [postId]: reaction,
        },
      }
    );

    onSuccess(data);
  } catch (err) {
    onError(err as AxiosError);
  }
};
