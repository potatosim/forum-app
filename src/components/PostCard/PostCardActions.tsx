import {
  Favorite,
  FavoriteBorder,
  ThumbDown,
  ThumbUp,
} from '@mui/icons-material';
import { Box, CardActions, IconButton, Tooltip } from '@mui/material';
import { type MouseEventHandler } from 'react';
import { useAuthContext } from '../../providers/AuthProvider/hooks';
import { changeReactions } from '../../services/changeReactions.mutation';
import { changeFavorites } from '../../services/changeFavorites.mutation';

interface IPostCardActions {
  id: string;
}

const PostCardActions = ({ id }: IPostCardActions) => {
  const { user, setUser } = useAuthContext();
  const isFavorite = (user?.favoritePosts ?? []).includes(id);
  const reaction = user?.postReactions?.[id] ?? null;

  const addToFavorites: MouseEventHandler = (event) => {
    event.stopPropagation();

    if (user) {
      changeFavorites({
        user,
        postId: id,
        onError: (err) => console.log(err.message),
        type: 'add',
        onSuccess: (updatedUser) => setUser(updatedUser),
      });
    }
  };

  const removeFromFavs: MouseEventHandler = (event) => {
    event.stopPropagation();

    if (user) {
      changeFavorites({
        user,
        postId: id,
        onError: (err) => console.log(err.message),
        type: 'remove',
        onSuccess: (updatedUser) => setUser(updatedUser),
      });
    }
  };

  const likePost: MouseEventHandler = (event) => {
    event.stopPropagation();

    if (user) {
      const updatedReaction = reaction && reaction === 'like' ? null : 'like';

      changeReactions({
        user,
        postId: id,
        reaction: updatedReaction,
        onSuccess: (updatedUser) => {
          setUser(updatedUser);
        },
        onError: (err) => {
          console.log(err.message);
        },
      });
    }
  };

  const disLikePost: MouseEventHandler = (event) => {
    event.stopPropagation();

    if (user) {
      const updatedReaction =
        reaction && reaction === 'dislike' ? null : 'dislike';

      changeReactions({
        user,
        postId: id,
        reaction: updatedReaction,
        onSuccess: (updatedUser) => {
          setUser(updatedUser);
        },
        onError: (err) => {
          console.log(err.message);
        },
      });
    }
  };

  return (
    <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
      {isFavorite ? (
        <Tooltip title="Remove from favorites">
          <IconButton
            onClick={removeFromFavs}
            aria-label="remove from favorites">
            <Favorite color="error" />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Add to favorites">
          <IconButton onClick={addToFavorites} aria-label="add to favorites">
            <FavoriteBorder />
          </IconButton>
        </Tooltip>
      )}
      <Box>
        <Tooltip title="Like post">
          <IconButton onClick={likePost} aria-label="like post">
            <ThumbUp color={reaction === 'like' ? 'action' : 'disabled'} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Dislike post">
          <IconButton onClick={disLikePost} aria-label="dislike post">
            <ThumbDown color={reaction === 'dislike' ? 'action' : 'disabled'} />
          </IconButton>
        </Tooltip>
      </Box>
    </CardActions>
  );
};

export default PostCardActions;
