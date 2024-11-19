{ pkgs
, mkShell
, ...
}:

mkShell {
  packages = with pkgs; [
    # Development environment tools (IDE support and dev convenience only)
    nodePackages.typescript-language-server
    nodePackages.svelte-language-server
    rust-analyzer
    cargo-watch
  ];

  buildNativeInputs = with pkgs; [
    # Build tools
    pkg-config
    cmake
    gnumake
    nodePackages.npm
    wasm-pack
    wasm-bindgen-cli
    nodePackages.typescript
    nodePackages.vite
    nodePackages.prettier  # Used in build process for formatting
    nodePackages.eslint    # Used in build process for linting
  ];

  buildInputs = with pkgs; [
    # Runtime dependencies
    nodejs_20
    rustToolchain
    firefox-developer-edition
    geckodriver

    # Firefox/Gecko runtime libraries
    geckodriver.libs
    firefox-developer-edition.libs
  ];

  shellHook = ''
    echo "PWA + Gecko development environment ready!"
    echo "Node version: $(node --version)"
    echo "Rust version: $(rustc --version)"
    echo "Firefox version: $(firefox --version)"
  '';

  RUST_SRC_PATH = "${pkgs.rust.packages.stable.rustPlatform.rustLibSrc}";
}
