import { LocalStorageKeys } from '../enum/LocalStorageKeys';
import type {
  ICommentDto,
  ILocalStorageReactions,
  IPostWithAdditionalData,
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

export const getCreatedPostsFromStorage = (): IPostWithAdditionalData[] => {
  const createdPosts = localStorage.getItem(LocalStorageKeys.CreatedPosts);
  return createdPosts ? JSON.parse(createdPosts) : [];
};

export const getCreatedPostFromStorage = (id: number) => {
  const createdPostId = getCreatedPostsFromStorage();
  const postFromLocalStorage = createdPostId.find(
    ({ id: postId }) => postId === +id!
  );

  return postFromLocalStorage;
};

export const updatePosts = (post: IPostWithAdditionalData) => {
  const createdPosts = getCreatedPostsFromStorage();

  const updatedCreatedPosts = [...createdPosts, post];

  localStorage.setItem(
    LocalStorageKeys.CreatedPosts,
    JSON.stringify(updatedCreatedPosts)
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

export const getCommentsByPostIdFromStorage = (id: number) => {
  const comments = getCommentsFromStorage();

  return comments.filter(({ postId }) => postId === id);
};

export const updateComments = (
  text: string,
  postId: number,
  id: number,
  currentUser: IUserDto
) => {
  const comments = getCommentsFromStorage();

  const comment: ICommentDto = {
    body: text,
    likes: 0,
    postId,
    id,
    user: {
      fullName: `${currentUser?.firstName} ${currentUser?.lastName}`,
      username: currentUser?.firstName,
      id: currentUser?.id,
    },
  };

  const updatedComments = [...comments, comment];

  localStorage.setItem(
    LocalStorageKeys.Comments,
    JSON.stringify(updatedComments)
  );

  return comment;
};
