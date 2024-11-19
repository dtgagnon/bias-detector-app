import React from 'react';
import { Box, Tooltip, Typography } from '@mui/material';

const BiasHighlighter = ({ biases, onBiasClick }) => {
  const renderHighlights = () => {
    return biases.map((bias) => (
      <Tooltip
        key={bias.id}
        title={
          <Box>
            <Typography variant="subtitle1" fontWeight="bold">
              {bias.category}
            </Typography>
            <Typography variant="body2">
              Click to learn more about this bias
            </Typography>
          </Box>
        }
      >
        <Box
          component="span"
          onClick={() => onBiasClick(bias)}
          sx={{
            backgroundColor: 'rgba(255, 235, 59, 0.3)',
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: 'rgba(255, 235, 59, 0.5)',
            },
            position: 'absolute',
            left: `${bias.startIndex}px`,
            top: `${bias.startIndex}px`,
            width: `${bias.endIndex - bias.startIndex}px`,
            height: '1.2em',
            zIndex: 1000,
          }}
        />
      </Tooltip>
    ));
  };

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
        '& > *': {
          pointerEvents: 'auto',
        },
      }}
    >
      {renderHighlights()}
    </Box>
  );
};

export default BiasHighlighter;
