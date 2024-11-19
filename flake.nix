{
  description = "Bias Detective - Web Content Bias Analyzer";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-24.05";
    unstable.url = "github:NixOS/nixpkgs/nixos-unstable";
    snowfall-lib = {
      url = "github:snowfallorg/lib";
      inputs.nixpkgs.follows = "nixpkgs";
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
      snowfall.namespace = "spirenix";

      overlays = [
        inputs.rust-overlay.overlays.default
        (final: prev: {
          rustToolchain = final.rust-bin.stable.latest.default;
        })
      ];

      outputs-builder = channels: {
        packages.default = channels.nixpkgs.callPackage ./nix/packages/bias-detector {};
      };
    };
}