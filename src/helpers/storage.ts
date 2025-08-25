import { LocalStorageKeys } from '../enum/LocalStorageKeys';
import type {
  ICommentDto,
  ILocalStorageReactions,
  IUserDto,
} from '../types/data-contracts';

export const getReactionsFromStorage = (): ILocalStorageReactions => {
  const reactions = localStorage.getItem(LocalStorageKeys.Reactions);

  return reactions ? (JSON.parse(reactions) as ILocalStorageReactions) : {};
};

export const getDeletedPostsFromStorage = (): number[] => {
  const deletedPosts = localStorage.getItem(LocalStorageKeys.DeletedPosts);
  return deletedPosts ? JSON.parse(deletedPosts) : [];
};

export const updateDeletedPosts = (postId: number): void => {
  const deletedPosts = getDeletedPostsFromStorage();

  const updatedDeletedPosts = [...deletedPosts, postId];

  localStorage.setItem(
    LocalStorageKeys.DeletedPosts,
    JSON.stringify(updatedDeletedPosts)
  );
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

export const getCommentsFromStorage = () => {
  const comments = localStorage.getItem(LocalStorageKeys.Comments);

  const parsedComments = comments
    ? (JSON.parse(comments) as ICommentDto[])
    : [];

  return parsedComments;
};

export const updateComments = (
  text: string,
  postId: number,
  id: number,
  currentUser: IUserDto
) => {
  const comments = getCommentsFromStorage();
  const updatedComments = [
    ...comments,
    {
      body: text,
      likes: 0,
      postId,
      id,
      user: {
        fullName: `${currentUser?.firstName} ${currentUser?.lastName}`,
        username: currentUser?.firstName,
        id: currentUser?.id,
      },
    } as ICommentDto,
  ];
  localStorage.setItem(
    LocalStorageKeys.Comments,
    JSON.stringify(updatedComments)
  );

  return updatedComments;
};
