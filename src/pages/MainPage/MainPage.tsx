import { Paper } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import PostCard from '../../components/PostCard';
import type {
  GetAllPostsResponse,
  IPostWithFavorites,
} from '../../types/data-contracts';
import { getFavoritesPostsFromStorage } from '../../helpers/getFavoritesPostsFromStorage';

const MainPage = () => {
  const [posts, setPosts] = useState<IPostWithFavorites[]>([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const { data } = await axios.get<GetAllPostsResponse>(
          'https://dummyjson.com/posts'
        );

        const favoritesPosts = getFavoritesPostsFromStorage();

        setPosts(
          data.posts.map((post) => ({
            ...post,
            isFavorite: favoritesPosts.includes(post.id),
          }))
        );
      } catch (err) {
        console.log((err as Error).message);
      }
    };
    getPosts();
  }, []);

  return (
    <Paper
      elevation={6}
      sx={{
        width: '60%',
        borderRadius: '1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '1.5rem',
      }}>
      {posts.map((post) => (
        <PostCard key={`${post.id}${post.title}`} post={post} />
      ))}
    </Paper>
  );
};

export default MainPage;
