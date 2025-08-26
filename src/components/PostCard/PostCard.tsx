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
import type { IPostDto } from '../../types/data-contracts';
import { Delete } from '@mui/icons-material';
import type { MouseEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';

interface PostCardProps {
  post: IPostDto;
  onPostClick?: (post: IPostDto) => void;
  onPostDelete?: (post: IPostDto) => void;
}

const PostCard = ({ post, onPostDelete, onPostClick }: PostCardProps) => {
  const navigate = useNavigate();
  const { title, body, username, userId } = post;
  const { user } = useAuthContext();

  const handleDeletePost: MouseEventHandler = (event) => {
    event.stopPropagation();
    onPostDelete?.(post);
  };

  const handlePostClick: MouseEventHandler = (event) => {
    event.stopPropagation();
    onPostClick?.(post);
  };

  const handleAvatarClick: MouseEventHandler = (event) => {
    event.stopPropagation();
    navigate(`/users/${userId}`);
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
          <Avatar
            sx={{ bgcolor: '#30c3e7' }}
            aria-label="user"
            onClick={handleAvatarClick}>
            {username[0].toUpperCase()}
          </Avatar>
        }
        action={
          user &&
          (user.role === 'admin' || user.id === post.userId) && (
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
      <PostCardActions id={post.id} />
    </Card>
  );
};

export default PostCard;
