import { Send } from '@mui/icons-material';
import { Box, IconButton, TextareaAutosize, Tooltip } from '@mui/material';
import { useState } from 'react';
import type { ICommentDto } from '../../types/data-contracts';
import { useAuthContext } from '../../providers/AuthProvider/hooks';

const CommentTextArea = ({
  postId,
  onSubmit,
}: {
  postId: string;
  onSubmit: (comment: Omit<ICommentDto, 'id' | 'likes'>) => void;
}) => {
  const { user } = useAuthContext();

  const [text, setText] = useState('');

  const handleComment = () => {
    const comment: Omit<ICommentDto, 'id' | 'likes'> = {
      body: text,
      postId,
      user: {
        id: user?.id as string,
        fullName: `${user?.firstName} ${user?.lastName}`,
        username: user?.username as string,
      },
    };
    onSubmit(comment);
    setText('');
  };

  return (
    <Box display="flex" alignItems="center" columnGap="1rem">
      <TextareaAutosize
        style={{
          height: '50px',
          width: '90%',
          backgroundColor: 'transparent',
          color: '#ffffff',
          resize: 'none',
          padding: '0.5rem',
          borderRadius: '0.5rem',
        }}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Leave your comment..."
        maxRows={2}
      />

      <Tooltip title="Send a comment">
        <span>
          <IconButton
            color="warning"
            disabled={!text.trim().length}
            size="large"
            onClick={handleComment}>
            <Send />
          </IconButton>
        </span>
      </Tooltip>
    </Box>
  );
};

export default CommentTextArea;
