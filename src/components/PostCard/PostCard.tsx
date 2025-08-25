import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import PostCardActions from './PostCardActions';
import { useAuthContext } from '../../providers/AuthProvider/hooks';
import type { IPostWithAdditionalData } from '../../types/data-contracts';

interface PostCardProps {
  post: IPostWithAdditionalData;
}

const PostCard = ({
  post: { title, body, userId, id, isFavorite, reactions, reaction },
}: PostCardProps) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isSeparatePost = pathname.includes('post');

  const { user } = useAuthContext();

  return (
    <Card
      sx={{
        width: '100%',
        borderRadius: '0.5rem',
        cursor: isSeparatePost ? 'auto' : 'pointer',
      }}
      onClick={() => {
        if (!isSeparatePost) {
          navigate(`/post/${id}`);
        }
      }}>
      <CardHeader
        title={title}
        avatar={
          <Avatar sx={{ bgcolor: '#30c3e7' }} aria-label="user">
            {userId}
          </Avatar>
        }
        action={user && user.role === 'admin' && <div>delete</div>}
      />
      <CardContent>
        <Typography>{body}</Typography>
      </CardContent>
      <PostCardActions
        reactions={reactions}
        isFavorite={isFavorite}
        id={id}
        reaction={reaction}
      />
    </Card>
  );
};

export default PostCard;
