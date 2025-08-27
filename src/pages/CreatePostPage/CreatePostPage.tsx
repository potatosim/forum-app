import { useState } from 'react';
import { useAuthContext } from '../../providers/AuthProvider/hooks';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { createPost } from '../../services/createPost.mutation';

const CreatePostPage = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleCreatePost = () => {
    if (user) {
      createPost(
        {
          body,
          title,
          userId: user.id,
          username: user.username,
        },
        {
          onSuccess: (post) => {
            navigate(`/post/${post.id}`);
          },
          onError: (err) => console.log(err.message),
        }
      );
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Card
        sx={{
          maxWidth: 600,
          width: '100%',
          boxShadow: 4,
          borderRadius: 3,
          padding: '1.5rem',
        }}>
        <CardHeader
          title="Create a new post"
          subheader="Fill out the fields to create new post"
        />
        <CardContent>
          <Grid container spacing={2}>
            <Grid size={12}>
              <TextField
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                fullWidth
                required
              />
            </Grid>
            <Grid size={12}>
              <TextField
                label="Your thoughts..."
                value={body}
                onChange={(e) => setBody(e.target.value)}
                fullWidth
                multiline
                rows={4}
                required
              />
            </Grid>
            <Grid size={12}>
              <Button
                variant="contained"
                color="warning"
                fullWidth
                size="large"
                onClick={handleCreatePost}>
                Create post
              </Button>
            </Grid>
          </Grid>
          {(title || body) && (
            <Box mt={4}>
              <Typography variant="h6" gutterBottom>
                Preview:
              </Typography>
              <Typography variant="subtitle1">
                <strong>Title:</strong> {title || '—'}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                <strong>Text:</strong> {body || '—'}
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default CreatePostPage;
