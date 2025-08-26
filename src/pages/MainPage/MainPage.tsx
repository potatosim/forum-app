import { Alert, Box, Button, Pagination, Paper } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import PostCard from '../../components/PostCard';
import type { IPostDto } from '../../types/data-contracts';
import { getPosts } from '../../services/getPosts.query';
import UsersFilter from '../../components/UsersFilter';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../enum/AppRoutes';
import { deletePost } from '../../services/deletePost.mutation';

const MainPage = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [posts, setPosts] = useState<IPostDto[]>([]);
  const [error, setError] = useState('');
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const fetchPosts = useCallback(() => {
    getPosts({
      page: currentPage,
      userId: selectedUserId,
      onSuccess: ({ data, pages }) => {
        setPosts(data);
        setTotalPages(pages);
      },
      onError: (error) => {
        setError(error.message);
      },
    });
  }, [currentPage, selectedUserId]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleDeletePost = (deletedPost: IPostDto) => {
    deletePost(deletedPost.id, {
      onSuccess: () => fetchPosts(),
      onError: (error) => setError(error.message),
    });
  };

  const handlePostClick = (post: IPostDto) => {
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
        alignItems: 'center',
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
      {totalPages > 1 && (
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(_, page) => setCurrentPage(page)}
        />
      )}
      {posts.map((post) => (
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
