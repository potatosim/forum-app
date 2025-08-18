import { Send } from '@mui/icons-material';
import { Box, IconButton, TextareaAutosize, Tooltip } from '@mui/material';
import { useState } from 'react';

const CommentTextArea = () => {
  const [text, setText] = useState('');

  const handleComment = () => {
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
