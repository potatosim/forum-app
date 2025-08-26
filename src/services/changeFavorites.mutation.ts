import type { AxiosError } from 'axios';
import type { IUserDto } from '../types/data-contracts';
import axios from 'axios';

export const changeFavorites = async ({
  onError,
  onSuccess,
  postId,
  type,
  user,
}: {
  postId: string;
  user: IUserDto;
  type: 'add' | 'remove';
  onSuccess: (user: IUserDto) => void;
  onError: (error: AxiosError) => void;
}) => {
  try {
    const updatedFavorites =
      type === 'add'
        ? [...(user.favoritePosts ?? []), postId]
        : (user.favoritePosts ?? []).filter((id) => id !== postId);

    const { data } = await axios.patch<IUserDto>(
      `${import.meta.env.VITE_API_URL}/users/${user.id}`,
      {
        favoritePosts: updatedFavorites,
      }
    );

    onSuccess(data);
  } catch (err) {
    onError(err as AxiosError);
  }
};
