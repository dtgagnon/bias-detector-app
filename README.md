# Bias Detective - Web Content Bias Analyzer

A Progressive Web App (PWA) that helps users identify and understand bias in web content. This tool analyzes text content using AI to detect various types of cognitive biases and provides educational explanations to help users develop better critical thinking skills.

## Features

- 📱 Works on all devices (mobile and desktop)
- 🔍 Real-time bias detection
- 💡 Educational explanations for different types of bias
- 🎯 Interactive highlighting of biased content
- 📚 Suggestions for critical thinking
- 🌐 Works offline (PWA)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd bias-detector
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your OpenAI API key:
```
REACT_APP_OPENAI_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm start
```

The app will be available at `http://localhost:3000`

### Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `build` directory.

## How It Works

1. The app loads web content in a secure iframe
2. Content is extracted and analyzed using AI
3. Biased content is highlighted with yellow markers
4. Users can click on highlights to learn more about the bias
5. Educational popups explain the bias and provide critical thinking tips

## Types of Bias Detected

- Confirmation Bias
- Anchoring Bias
- Availability Bias
- Bandwagon Effect
- Authority Bias
- Framing Effect
- Stereotyping
- Selection Bias
- Attribution Bias

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting pull requests.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- OpenAI for providing the language model API
- Material-UI for the component library
- React team for the framework
- All contributors and users of this tool

## Security

This app uses secure iframe sandboxing and content security policies to ensure safe browsing. However, always be cautious when visiting unknown websites.
