import { LocalStorageKeys } from '../enum/LocalStorageKeys';
import type { ILocalStorageReactions } from '../types/data-contracts';

export const getReactionsFromStorage = (): ILocalStorageReactions => {
  const reactions = localStorage.getItem(LocalStorageKeys.Reactions);

  return reactions ? (JSON.parse(reactions) as ILocalStorageReactions) : {};
};

export const changeFavorites = (
  postId: number,
  userId: number,
  isFavorite: boolean
): void => {
  const reactions = getReactionsFromStorage();

  const updatedReactions: ILocalStorageReactions = {
    ...reactions,
    [userId.toString()]: {
      ...reactions?.[userId.toString()],
      [postId.toString()]: {
        ...reactions?.[userId.toString()]?.[postId.toString()],
        isFavorite,
      },
    },
  };

  localStorage.setItem(
    LocalStorageKeys.Reactions,
    JSON.stringify(updatedReactions)
  );
};

export const changeReaction = (
  postId: number,
  userId: number,
  reaction: 'like' | 'dislike' | null
): void => {
  const reactions = getReactionsFromStorage();

  const updatedReactions: ILocalStorageReactions = {
    ...reactions,
    [userId.toString()]: {
      ...reactions?.[userId],
      [postId.toString()]: {
        ...reactions?.[userId.toString()]?.[postId.toString()],
        reaction,
      },
    },
  };

  localStorage.setItem(
    LocalStorageKeys.Reactions,
    JSON.stringify(updatedReactions)
  );
};
