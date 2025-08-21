import { Alert, CircularProgress, Paper } from '@mui/material';
import PostCard from '../../components/PostCard';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Comment from '../../components/Comment';
import type {
  ICommentDto,
  IPostWithAdditionalData,
} from '../../types/data-contracts';
import CommentTextArea from '../../components/Comment/CommentTextArea';
import { getPostWithAdditionalData } from '../../helpers/getPostsWithAdditionalData';
import { getCommentsFromStorage } from '../../helpers/storage';
import { getPost } from '../../services/getPost.query';
import { getCommentsByPostId } from '../../services/getCommentsByPostId.query';
import { useAuthContext } from '../../providers/AuthProvider/hooks';

const PostPage = () => {
  const { user } = useAuthContext();
  const { id } = useParams();
  const [post, setPost] = useState<IPostWithAdditionalData | null>(null);
  const [commentsFromBE, setCommentsFromBE] = useState<ICommentDto[]>([]);
  const [commentsFromLS, setCommentsFromLS] = useState<ICommentDto[]>([]);
  const [postsError, setPostsError] = useState('');
  const [commentsError, setCommentsError] = useState('');

  useEffect(() => {
    if (id) {
      getPost({
        id,
        onSuccess: (post) => {
          setPost(getPostWithAdditionalData(post, user));
        },
        onError: (error) => {
          setPostsError(error.message);
        },
      });

      getCommentsByPostId({
        id,
        onSuccess: (comments) => {
          setCommentsFromBE(comments);
        },
        onError: (error) => {
          setCommentsError(error.message);
        },
      });
    }

    setCommentsFromLS(
      getCommentsFromStorage().filter(({ postId }) => postId === +id!)
    );
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
        padding: '1.5rem',
      }}>
      {post ? <PostCard post={post} /> : <CircularProgress />}
      <CommentTextArea
        postId={+id!}
        lastCommentId={[...commentsFromBE, ...commentsFromLS].length}
        setComments={setCommentsFromLS}
      />
      {[...commentsFromBE, ...commentsFromLS].map((comment) => (
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
