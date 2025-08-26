import type { AxiosError } from 'axios';
import type { IUserDto } from '../types/data-contracts';
import axios from 'axios';

export const updateUser = async ({
  dto,
  onError,
  onSuccess,
}: {
  id: string;
  dto: IUserDto;
  onSuccess: (user: IUserDto) => void;
  onError: (err: AxiosError) => void;
}) => {
  try {
    const { data } = await axios.patch<IUserDto>(
      `${import.meta.env.VITE_API_URL}/users/${dto.id}`,
      dto
    );

    onSuccess(data);
  } catch (err) {
    onError(err as AxiosError);
  }
};
