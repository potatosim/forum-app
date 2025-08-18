import { LocalStorageKeys } from '../enum/LocalStorageKeys';

export const getFavoritesPostsFromStorage = (): number[] => {
  const favorites = localStorage.getItem(LocalStorageKeys.Favorites);

  return favorites ? (JSON.parse(favorites) as number[]) : [];
};
