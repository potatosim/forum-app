import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import PostCardActions from './PostCardActions';
import { useAuthContext } from '../../providers/AuthProvider/hooks';
import type { IPostWithAdditionalData } from '../../types/data-contracts';
import { Delete } from '@mui/icons-material';
import type { MouseEventHandler } from 'react';

interface PostCardProps {
  post: IPostWithAdditionalData;
  onPostClick?: (post: IPostWithAdditionalData) => void;
  onPostDelete?: (post: IPostWithAdditionalData) => void;
}

const PostCard = ({ post, onPostDelete, onPostClick }: PostCardProps) => {
  const { title, body, userId, id, isFavorite, reactions, reaction } = post;
  const { user } = useAuthContext();

  const handleDeletePost: MouseEventHandler = (event) => {
    event.stopPropagation();
    onPostDelete?.(post);
  };

  const handlePostClick: MouseEventHandler = (event) => {
    event.stopPropagation();
    onPostClick?.(post);
  };

  return (
    <Card
      sx={{
        width: '100%',
        borderRadius: '0.5rem',
        cursor: !onPostClick ? 'auto' : 'pointer',
      }}
      onClick={handlePostClick}>
      <CardHeader
        title={title}
        avatar={
          <Avatar sx={{ bgcolor: '#30c3e7' }} aria-label="user">
            {userId}
          </Avatar>
        }
        action={
          user &&
          user.role === 'admin' && (
            <Tooltip title="Delete post">
              <IconButton onClick={handleDeletePost}>
                <Delete />
              </IconButton>
            </Tooltip>
          )
        }
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
