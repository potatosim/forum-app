import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import type { IPostWithFavorites } from '../../types/data-contracts';
import PostCardActions from './PostCardActions';

interface PostCardProps {
  post: IPostWithFavorites;
}

const PostCard = ({
  post: { title, body, userId, id, isFavorite },
}: PostCardProps) => {
  const navigate = useNavigate();

  return (
    <Card
      sx={{ width: '100%', borderRadius: '0.5rem', cursor: 'pointer' }}
      onClick={() => navigate(`/post/${id}`)}>
      <CardHeader
        title={title}
        avatar={
          <Avatar sx={{ bgcolor: '#30c3e7' }} aria-label="user">
            {userId}
          </Avatar>
        }></CardHeader>
      <CardContent>
        <Typography>{body}</Typography>
      </CardContent>
      <CardActions disableSpacing>
        <PostCardActions isFavorite={isFavorite} id={id} />
      </CardActions>
    </Card>
  );
};

export default PostCard;
