import { Avatar, Box, Typography } from '@mui/material';
import type { ICommentDto } from '../../types/data-contracts';

interface CommentProps {
  comment: ICommentDto;
}
const Comment = ({
  comment: {
    body,
    user: { fullName },
  },
}: CommentProps) => {
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
          onClick={() => {}}
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
