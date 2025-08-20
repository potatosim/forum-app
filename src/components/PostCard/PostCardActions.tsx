import {
  Favorite,
  FavoriteBorder,
  ThumbDown,
  ThumbUp,
} from '@mui/icons-material';
import { Box, CardActions, IconButton, Tooltip } from '@mui/material';
import { useState, type MouseEventHandler } from 'react';
import { changeFavorites, changeReaction } from '../../helpers/storage';
import { useCurrentUser } from '../../providers/AuthProvider/hooks';
import type { IPostWithAdditionalData } from '../../types/data-contracts';

const PostCardActions = ({
  isFavorite,
  id,
  reactions,
  reaction,
}: Pick<
  IPostWithAdditionalData,
  'id' | 'isFavorite' | 'reaction' | 'reactions'
>) => {
  const currentUser = useCurrentUser();
  const [isPostFavorite, setIsPostFavorite] = useState(isFavorite);
  const [currentUserReaction, setCurrentUserReaction] = useState(reaction);

  const addToFavorites: MouseEventHandler = (event) => {
    event.stopPropagation();
    changeFavorites(id, currentUser?.id as number, true);

    setIsPostFavorite(true);
  };

  const removeFromFavs: MouseEventHandler = (event) => {
    event.stopPropagation();

    changeFavorites(id, currentUser?.id as number, false);

    setIsPostFavorite(false);
  };

  const likePost: MouseEventHandler = (event) => {
    event.stopPropagation();

    const updatedReaction =
      currentUserReaction && currentUserReaction === 'like' ? null : 'like';

    changeReaction(id, currentUser?.id as number, updatedReaction);
    setCurrentUserReaction(updatedReaction);
  };

  const disLikePost: MouseEventHandler = (event) => {
    event.stopPropagation();

    const updatedReaction =
      currentUserReaction && currentUserReaction === 'dislike'
        ? null
        : 'dislike';

    changeReaction(id, currentUser?.id as number, updatedReaction);
    setCurrentUserReaction(updatedReaction);
  };

  return (
    <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
      {isPostFavorite ? (
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
        <Tooltip
          title={`${
            currentUserReaction === 'like'
              ? (reactions?.likes || 0) + 1
              : reactions?.likes
          } people like this post`}>
          <IconButton onClick={likePost} aria-label="like post">
            <ThumbUp
              color={currentUserReaction === 'like' ? 'action' : 'disabled'}
            />
          </IconButton>
        </Tooltip>
        <Tooltip
          title={`${
            currentUserReaction === 'dislike'
              ? (reactions?.dislikes || 0) + 1
              : reactions?.dislikes
          } people dislike this post`}>
          <IconButton onClick={disLikePost} aria-label="dislike post">
            <ThumbDown
              color={currentUserReaction === 'dislike' ? 'action' : 'disabled'}
            />
          </IconButton>
        </Tooltip>
      </Box>
    </CardActions>
  );
};

export default PostCardActions;
