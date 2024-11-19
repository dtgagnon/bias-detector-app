{
  description = "Bias Detective - Web Content Bias Analyzer";

  inputs = {
    stable.url = "github:NixOS/nixpkgs/nixos-24.05";
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    snowfall-lib = {
      url = "github:snowfallorg/lib";
      inputs.nixpkgs.follows = "stable";
    };
    rust-overlay = {
      url = "github:oxalica/rust-overlay";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs = inputs:
    inputs.snowfall-lib.mkFlake {
      inherit inputs;
      src = ./nix;
      snowfall.namespace = "bias-app";

      overlays = [
        inputs.rust-overlay.overlays.default
        (final: prev: {
          rustToolchain = final.rust-bin.stable.latest.default;
        })
      ];

      # outputs-builder = channels: {
      #   packages.default = channels.nixpkgs.callPackage ./nix/packages/bias-detector {};
      # };
    };
}