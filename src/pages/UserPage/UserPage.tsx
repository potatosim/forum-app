import { Box } from '@mui/material';

import ProfileCard from '../../components/ProfileCard/ProfileCard';
import { useEffect, useState } from 'react';
import type { IPostDto, IUserDto } from '../../types/data-contracts';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserById } from '../../services/getUserById.query';
import { getPostByUserId } from '../../services/getPostsByUserId.query';
import PostCard from '../../components/PostCard';
import { deletePost } from '../../services/deletePost.mutation';
import { AppRoutes } from '../../enum/AppRoutes';

const UserPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState<IUserDto | null>(null);
  const [posts, setPosts] = useState<IPostDto[]>([]);

  useEffect(() => {
    if (id) {
      getUserById({
        id,
        onError: (err) => console.log(err.message),
        onSuccess: (userResponse) => setUser(userResponse),
      });

      getPostByUserId({
        id,
        onError: (err) => console.log(err.message),
        onSuccess: (postsResponse) => setPosts(postsResponse),
      });
    }
  }, []);

  const handleDeletePost = (deletedPost: IPostDto) => {
    deletePost(deletedPost.id, {
      onSuccess: (data) =>
        setPosts((prev) => prev.filter((post) => post.id !== data.id)),
      onError: (error) => console.log(error.message),
    });
  };

  const handlePostClick = (post: IPostDto) => {
    navigate(AppRoutes.Post.replace(':id', `${post.id}`));
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        rowGap: '1.5rem',
        width: '75%',
        alignItems: 'center',
      }}>
      {user && <ProfileCard user={user} editable={false} />}
      {!!posts.length &&
        posts.map((post) => (
          <PostCard
            key={`${post.id}${post.title}`}
            post={post}
            onPostDelete={handleDeletePost}
            onPostClick={handlePostClick}
          />
        ))}
    </Box>
  );
};

export default UserPage;
