import { Avatar, Box, Typography } from '@mui/material';
import type { ICommentDto } from '../../types/data-contracts';
import { useNavigate } from 'react-router-dom';

interface CommentProps {
  comment: ICommentDto;
}
const Comment = ({
  comment: {
    body,
    user: { fullName, id },
  },
}: CommentProps) => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: 'flex',
        gap: '1.5rem',
        flexDirection: 'column',
        border: '1px solid lightgrey',
        borderRadius: '0.5rem',
        padding: '0.5rem',
        width: '100%',
      }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Avatar
          onClick={() => {
            navigate(`/users/${id}`);
          }}
          sx={{ cursor: 'pointer', backgroundColor: '#85e247' }}>
          {fullName[0]}
        </Avatar>
        <Typography>{fullName}</Typography>
      </Box>
      <Typography>{body}</Typography>
    </Box>
  );
};

export default Comment;
