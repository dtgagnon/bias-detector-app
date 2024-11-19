import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Chip,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';

const EducationalPopup = ({ bias, onClose }) => {
  if (!bias) return null;

  return (
    <Dialog
      open={true}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          boxShadow: 3,
        },
      }}
    >
      <DialogTitle sx={{ bgcolor: 'primary.main', color: 'white' }}>
        <Typography variant="h6">{bias.category}</Typography>
        <Chip
          label={`Confidence: ${Math.round(bias.confidence * 100)}%`}
          size="small"
          sx={{ mt: 1, bgcolor: 'white' }}
        />
      </DialogTitle>
      
      <DialogContent>
        <Box sx={{ my: 2 }}>
          <Typography variant="subtitle1" color="primary" gutterBottom>
            Identified Text:
          </Typography>
          <Typography
            variant="body1"
            sx={{
              bgcolor: 'grey.100',
              p: 2,
              borderRadius: 1,
              fontStyle: 'italic',
            }}
          >
            "{bias.text}"
          </Typography>
        </Box>

        <Box sx={{ my: 2 }}>
          <Typography variant="subtitle1" color="primary" gutterBottom>
            Explanation:
          </Typography>
          <Typography variant="body1">
            {bias.explanation}
          </Typography>
        </Box>

        {bias.suggestions && bias.suggestions.length > 0 && (
          <Box sx={{ my: 2 }}>
            <Typography variant="subtitle1" color="primary" gutterBottom>
              How to Think Critically:
            </Typography>
            <List>
              {bias.suggestions.map((suggestion, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={suggestion}
                    sx={{
                      '& .MuiListItemText-primary': {
                        fontSize: '0.9rem',
                      },
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button
          onClick={onClose}
          variant="contained"
          color="primary"
        >
          Got it!
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EducationalPopup;
