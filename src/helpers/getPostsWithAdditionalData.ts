import type {
  IPostDto,
  IPostWithAdditionalData,
  IUserDto,
} from '../types/data-contracts';
import { getReactionsFromStorage } from './storage';

export const getPostsWithAdditionalData = (
  posts: IPostDto[],
  currentUser: IUserDto | null
): IPostWithAdditionalData[] => {
  const reactions = getReactionsFromStorage();

  return posts.map((post) => {
    const currentUserReactions = currentUser ? reactions[currentUser.id] : {};

    return {
      ...post,
      isFavorite: currentUserReactions?.[post.id]?.isFavorite ?? false,
      reaction: currentUserReactions?.[post.id]?.reaction ?? null,
    };
  });
};

export const getPostWithAdditionalData = (
  post: IPostDto,
  currentUser: IUserDto | null
): IPostWithAdditionalData => {
  const reactions = getReactionsFromStorage();
  const currentUserReactions = currentUser ? reactions[currentUser.id] : {};

  return {
    ...post,
    isFavorite: currentUserReactions?.[post.id]?.isFavorite ?? false,
    reaction: currentUserReactions?.[post.id]?.reaction ?? null,
  };
};
