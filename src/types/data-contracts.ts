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

export interface IPostWithFavorites extends IPostDto {
  isFavorite: boolean;
}
