import type { AxiosError } from 'axios';

export type ServiceHandler<T> = {
  onSuccess: (data: T) => void;
  onError: (error: AxiosError) => void;
};
