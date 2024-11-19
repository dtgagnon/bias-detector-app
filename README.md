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

- [Nix](https://nixos.org/download.html) package manager
  - Enable experimental features:
    ```bash
    # In ~/.config/nix/nix.conf or /etc/nix/nix.conf
    experimental-features = nix-command flakes
    ```
- [direnv](https://direnv.net/) (recommended)

### Development Setup

1. Clone the repository:
```bash
git clone [repository-url]
cd bias-detector-app
```

2. Enable direnv (if using):
```bash
direnv allow
```

Alternatively, you can enter the development shell manually:
```bash
nix develop
```

3. Create a `.env` file in the root directory and add your OpenAI API key:
```
OPENAI_API_KEY=your_api_key_here
```

### Project Structure

```
.
├── flake.nix           # Nix flake configuration
├── shells/             # Development shell configurations
├── nix/                # Nix package definitions
│   └── packages/
│       └── bias-detector/
├── frontend/           # Web frontend (Svelte)
└── src/               # Rust backend code
```

### Building

To build the project:

```bash
nix build
```

### Running in Development

Start the development server:

```bash
# Frontend development server
cd frontend && npm run dev

# Backend development server (in another terminal)
cargo watch -x run
```

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

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- OpenAI for providing the language model API
- Material-UI for the component library
- React team for the framework
- All contributors and users of this tool

## Security

This app uses secure iframe sandboxing and content security policies to ensure safe browsing. However, always be cautious when visiting unknown websites.
