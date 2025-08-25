import { Alert, Box, Button, Paper } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import PostCard from '../../components/PostCard';
import type { IPostWithAdditionalData } from '../../types/data-contracts';
import { getPostsWithAdditionalData } from '../../helpers/getPostsWithAdditionalData';
import { getPosts } from '../../services/getPosts.query';
import { useAuthContext } from '../../providers/AuthProvider/hooks';
import UsersFilter from '../../components/UsersFilter';
import { updateDeletedPosts } from '../../helpers/storage';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../enum/AppRoutes';

const MainPage = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [posts, setPosts] = useState<IPostWithAdditionalData[]>([]);
  const [error, setError] = useState('');
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  useEffect(() => {
    getPosts({
      onSuccess: ({ posts }) => {
        setPosts(getPostsWithAdditionalData(posts, user));
      },
      onError: (error) => {
        setError(error.message);
      },
    });
  }, []);

  const postsToRender = useMemo(() => {
    if (!selectedUserId) {
      return posts;
    }

    return posts.filter((post) => post.userId === selectedUserId);
  }, [selectedUserId, posts]);

  const handleDeletePost = (deletedPost: IPostWithAdditionalData) => {
    setPosts((prev) => prev.filter((post) => post.id !== deletedPost.id));
    updateDeletedPosts(deletedPost.id);
  };

  const handlePostClick = (post: IPostWithAdditionalData) => {
    navigate(AppRoutes.Post.replace(':id', `${post.id}`));
  };

  const handleAddNewPost = () => {
    navigate(AppRoutes.CreatePost);
  };

  return (
    <Paper
      elevation={6}
      sx={{
        width: '60%',
        borderRadius: '1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: '1.5rem',
      }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
        }}>
        <UsersFilter
          selectedUser={selectedUserId}
          setSelectedUser={setSelectedUserId}
        />
        <Button onClick={handleAddNewPost} color="warning">
          Add new post
        </Button>
      </Box>
      {postsToRender.map((post) => (
        <PostCard
          key={`${post.id}${post.title}`}
          post={post}
          onPostDelete={handleDeletePost}
          onPostClick={handlePostClick}
        />
      ))}
      {error && <Alert severity="error">{error}</Alert>}
    </Paper>
  );
};

export default MainPage;
