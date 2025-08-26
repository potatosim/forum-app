import { Alert, CircularProgress, Paper } from '@mui/material';
import PostCard from '../../components/PostCard';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Comment from '../../components/Comment';
import type { ICommentDto, IPostDto } from '../../types/data-contracts';
import CommentTextArea from '../../components/Comment/CommentTextArea';
import { getPost } from '../../services/getPost.query';
import { getCommentsByPostId } from '../../services/getCommentsByPostId.query';
import { AppRoutes } from '../../enum/AppRoutes';
import { deletePost } from '../../services/deletePost.mutation';
import { createComment } from '../../services/createComment.mutation';

const PostPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [post, setPost] = useState<IPostDto | null>(null);
  const [comments, setComments] = useState<ICommentDto[]>([]);
  const [postsError, setPostsError] = useState('');
  const [commentsError, setCommentsError] = useState('');

  useEffect(() => {
    if (id) {
      getPost({
        id,
        onSuccess: (post) => {
          setPost(post);
        },
        onError: (error) => {
          setPostsError(error.message);
        },
      });

      getCommentsByPostId({
        id,
        onSuccess: (comments) => {
          setComments(comments);
        },
        onError: (error) => {
          setCommentsError(error.message);
        },
      });
    }
  }, []);

  const handlePostDelete = (deletedPost: IPostDto) => {
    deletePost(deletedPost.id, {
      onSuccess: () => navigate(AppRoutes.Home),
      onError: (err) => console.log(err.message),
    });
  };

  const handleAddComment = (comment: Omit<ICommentDto, 'id' | 'likes'>) => {
    createComment(comment, {
      onSuccess: (newComment) => setComments((prev) => [...prev, newComment]),
      onError: (err) => console.log(err.message),
    });
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
        padding: '1.5rem',
      }}>
      {post ? (
        <>
          <PostCard post={post} onPostDelete={handlePostDelete} />
          <CommentTextArea postId={post.id} onSubmit={handleAddComment} />
        </>
      ) : (
        <CircularProgress />
      )}
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
