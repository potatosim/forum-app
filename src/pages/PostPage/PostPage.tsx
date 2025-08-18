import { Alert, CircularProgress, Paper } from '@mui/material';
import PostCard from '../../components/PostCard';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Comment from '../../components/Comment';
import type {
  GetAllCommentsResponse,
  ICommentDto,
  IPostDto,
  IPostWithFavorites,
} from '../../types/data-contracts';
import { getFavoritesPostsFromStorage } from '../../helpers/getFavoritesPostsFromStorage';
import CommentTextArea from '../../components/Comment/CommentTextArea';

const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState<IPostWithFavorites | null>(null);
  const [comments, setComments] = useState<ICommentDto[]>([]);
  const [postsError, setPostsError] = useState('');
  const [commentsError, setCommentsError] = useState('');

  useEffect(() => {
    const getPost = async () => {
      try {
        const { data } = await axios.get<IPostDto>(
          `https://dummyjson.com/posts/${id}`
        );

        const favorites = getFavoritesPostsFromStorage();

        setPost({ ...data, isFavorite: favorites.includes(data.id) });
      } catch (err) {
        setPostsError((err as Error).message);
      }
    };
    getPost();

    const getCommentsByPostId = async () => {
      try {
        const { data } = await axios.get<GetAllCommentsResponse>(
          `https://dummyjson.com/comments/post/${id}`
        );

        setComments(data.comments);
      } catch (err) {
        setCommentsError((err as Error).message);
      }
    };
    getCommentsByPostId();
  }, [id]);

  console.log({ comments });

  return (
    <Paper
      elevation={6}
      sx={{
        width: '60%',
        borderRadius: '1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        padding: '1.5rem',
      }}>
      {post ? <PostCard post={post} /> : <CircularProgress />}
      <CommentTextArea />
      {comments.map((comment) => (
        <Comment comment={comment} key={`${comment.postId}${comment.id}`} />
      ))}
      {postsError && (
        <Alert severity="error">
          Couldn't load posts. Please, reload the page
        </Alert>
      )}
      {commentsError && (
        <Alert severity="error">
          Couldn't load comments. Please, reload the page
        </Alert>
      )}
    </Paper>
  );
};

export default PostPage;
