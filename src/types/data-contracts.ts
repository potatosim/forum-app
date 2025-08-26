export interface IPostDto {
  id: string;
  title: string;
  body: string;
  userId: string;
  username: string;
}

export interface ICommentDto {
  id: string;
  body: string;
  postId: string;
  user: {
    id: string;
    username: string;
    fullName: string;
  };
}

export interface IGetPaginationPosts {
  data: IPostDto[];
  pages: number;
}

export interface IUserDto {
  id: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'user';
  image: string;
  email: string;
  birthDate: string;
  username: string;
  password: string;
  address: {
    address: string;
    city: string;
    state: string;
    stateCode: string;
    postalCode: string;
    country: string;
  };
  favoritePosts: string[];
  postReactions: Record<string, 'like' | 'dislike' | null>;
}

export interface ILoginUserDto {
  username: string;
  password: string;
  expiresInMins?: number;
}
