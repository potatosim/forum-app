import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { CardActions, IconButton } from '@mui/material';
import type { IPostWithFavorites } from '../../types/data-contracts';
import { useState, type MouseEventHandler } from 'react';
import { LocalStorageKeys } from '../../enum/LocalStorageKeys';
import { getFavoritesPostsFromStorage } from '../../helpers/getFavoritesPostsFromStorage';

const PostCardActions = ({ isFavorite, id }: Partial<IPostWithFavorites>) => {
  const [isPostFavorite, setIsPostFavorite] = useState(isFavorite);

  const addToFavorites: MouseEventHandler = (event) => {
    event.stopPropagation();
    const favorites = getFavoritesPostsFromStorage();

    localStorage.setItem(
      LocalStorageKeys.Favorites,
      JSON.stringify([...favorites, id])
    );

    setIsPostFavorite(true);
  };

  const removeFromFavs: MouseEventHandler = (event) => {
    event.stopPropagation();

    const favorites = getFavoritesPostsFromStorage();

    console.log({ favorites });

    localStorage.setItem(
      LocalStorageKeys.Favorites,
      JSON.stringify(favorites.filter((postId) => postId !== id))
    );
    setIsPostFavorite(false);
  };
  return (
    <CardActions disableSpacing>
      {isPostFavorite ? (
        <IconButton onClick={removeFromFavs} aria-label="remove from favorites">
          <Favorite color="error" />
        </IconButton>
      ) : (
        <IconButton onClick={addToFavorites} aria-label="add to favorites">
          <FavoriteBorder />
        </IconButton>
      )}
    </CardActions>
  );
};

export default PostCardActions;
