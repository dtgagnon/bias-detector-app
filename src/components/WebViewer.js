import React, { useEffect, useRef } from 'react';
import { Box, TextField, IconButton } from '@mui/material';
import { Search as SearchIcon, Refresh as RefreshIcon } from '@mui/icons-material';

const WebViewer = ({ url, onUrlChange, onContentChange }) => {
  const iframeRef = useRef(null);
  const [inputUrl, setInputUrl] = React.useState('');

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const handleLoad = () => {
      try {
        const doc = iframe.contentDocument;
        if (doc) {
          // Extract text content from the page
          const content = doc.body.innerText;
          onContentChange(content);
        }
      } catch (error) {
        console.error('Error accessing iframe content:', error);
      }
    };

    iframe.addEventListener('load', handleLoad);
    return () => iframe.removeEventListener('load', handleLoad);
  }, [onContentChange]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let processedUrl = inputUrl;
    if (!inputUrl.startsWith('http://') && !inputUrl.startsWith('https://')) {
      processedUrl = `https://${inputUrl}`;
    }
    onUrlChange(processedUrl);
  };

  const handleRefresh = () => {
    if (iframeRef.current) {
      iframeRef.current.src = iframeRef.current.src;
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', p: 1 }}>
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          placeholder="Enter URL"
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
          sx={{ mr: 1 }}
        />
        <IconButton type="submit" color="primary">
          <SearchIcon />
        </IconButton>
        <IconButton onClick={handleRefresh} color="primary">
          <RefreshIcon />
        </IconButton>
      </Box>
      <Box sx={{ flexGrow: 1, border: 1, borderColor: 'grey.300' }}>
        <iframe
          ref={iframeRef}
          src={url}
          title="Web Content"
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
          }}
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        />
      </Box>
    </Box>
  );
};

export default WebViewer;
