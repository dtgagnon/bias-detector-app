import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container, Box, AppBar, Toolbar, TextField, IconButton } from '@mui/material';
import { Search as SearchIcon, Menu as MenuIcon } from '@mui/icons-material';
import BiasHighlighter from './components/BiasHighlighter';
import BiasAnalyzer from './services/BiasAnalyzer';
import EducationalPopup from './components/EducationalPopup';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2b2a33', // Firefox dark theme color
    },
    secondary: {
      main: '#ff3850', // Firefox accent color
    },
  },
});

function App() {
  const [url, setUrl] = useState('');
  const [content, setContent] = useState('');
  const [biasResults, setBiasResults] = useState([]);
  const [selectedBias, setSelectedBias] = useState(null);

  useEffect(() => {
    // Register service worker for PWA
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js');
    }

    // Use Firefox-specific features when available
    if ('mozSetMessageHandler' in navigator) {
      navigator.mozSetMessageHandler('activity', function(request) {
        if (request.source.name === 'share') {
          analyzeSharedContent(request.source.data);
        }
      });
    }
  }, []);

  const handleUrlSubmit = async (e) => {
    e.preventDefault();
    try {
      // Use Firefox's reader mode API if available
      if ('readability' in window) {
        const article = new window.Readability(document).parse();
        if (article) {
          await analyzeContent(article.textContent);
        }
      } else {
        // Fallback to regular fetch
        const response = await fetch(url);
        const text = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');
        await analyzeContent(doc.body.textContent);
      }
    } catch (error) {
      console.error('Error fetching content:', error);
    }
  };

  const analyzeContent = async (text) => {
    setContent(text);
    const results = await BiasAnalyzer.analyze(text);
    setBiasResults(results);
  };

  const handleBiasClick = (bias) => {
    setSelectedBias(bias);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Box component="form" onSubmit={handleUrlSubmit} sx={{ flexGrow: 1 }}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Enter URL to analyze"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                sx={{ 
                  bgcolor: 'background.paper',
                  borderRadius: 1,
                }}
              />
            </Box>
            <IconButton type="submit" color="inherit">
              <SearchIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        
        <Container maxWidth="xl" sx={{ mt: 2 }}>
          <Box sx={{ position: 'relative' }}>
            <div dangerouslySetInnerHTML={{ __html: content }} />
            <BiasHighlighter
              content={content}
              biases={biasResults}
              onBiasClick={handleBiasClick}
            />
          </Box>
        </Container>

        {selectedBias && (
          <EducationalPopup
            bias={selectedBias}
            onClose={() => setSelectedBias(null)}
          />
        )}
      </Box>
    </ThemeProvider>
  );
}

export default App;
