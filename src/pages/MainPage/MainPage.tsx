import { Alert, Paper } from '@mui/material';
import { useEffect, useState } from 'react';
import PostCard from '../../components/PostCard';
import type { IPostWithAdditionalData } from '../../types/data-contracts';
import { getPostsWithAdditionalData } from '../../helpers/getPostsWithAdditionalData';
import { getPosts } from '../../services/getPosts.query';
import { useAuthContext } from '../../providers/AuthProvider/hooks';

const MainPage = () => {
  const { user } = useAuthContext();
  const [posts, setPosts] = useState<IPostWithAdditionalData[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    getPosts({
      onSuccess: (posts) => {
        setPosts(getPostsWithAdditionalData(posts, user));
      },
      onError: (error) => {
        setError(error.message);
      },
    });
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
      {error && <Alert severity="error">{error}</Alert>}
    </Paper>
  );
};

export default MainPage;
