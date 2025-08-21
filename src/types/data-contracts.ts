export interface GetAllResponse {
  skip: number;
  total: number;
  limit: number;
}

export interface IPostDto {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: {
    likes: number;
    dislikes: number;
  };
  views: number;
  userId: number;
}

export interface ICommentDto {
  id: number;
  body: string;
  postId: number;
  likes: number;
  user: {
    id: number;
    username: string;
    fullName: string;
  };
}

export interface GetAllPostsResponse extends GetAllResponse {
  posts: IPostDto[];
}

export interface GetAllCommentsResponse extends GetAllResponse {
  comments: ICommentDto[];
}

export interface IPostWithAdditionalData extends IPostDto {
  isFavorite: boolean;
  reaction: 'like' | 'dislike' | null;
}

export interface IUserDto {
  id: number;
  firstName: string;
  lastName: string;
  role: 'admin' | 'user';
  image: string;
}

export interface ILoginUserDto {
  username: string;
  password: string;
  expiresInMins?: number;
}

export interface ILoginUserResponse {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string;
  refreshToken: string;
}
export interface ILocalStorageReactions {
  [userId: string]: {
    [postId: string]: {
      reaction: 'like' | 'dislike' | null;
      isFavorite: boolean;
    };
  };
}
