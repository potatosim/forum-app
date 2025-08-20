import { Paper } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import PostCard from '../../components/PostCard';
import type {
  GetAllPostsResponse,
  IPostWithAdditionalData,
} from '../../types/data-contracts';
import { getPostsWithAdditionalData } from '../../helpers/getPostsWithAdditionalData';
import { useCurrentUser } from '../../providers/AuthProvider/hooks';

const MainPage = () => {
  const currentUser = useCurrentUser();
  const [posts, setPosts] = useState<IPostWithAdditionalData[]>([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const { data } = await axios.get<GetAllPostsResponse>(
          'https://dummyjson.com/posts'
        );

        setPosts(getPostsWithAdditionalData(data.posts, currentUser));
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
