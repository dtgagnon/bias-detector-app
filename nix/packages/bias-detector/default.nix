{ lib
, pkgs
, stdenv
, nodejs_20
, nodePackages
, makeWrapper
, firefox-developer-edition
, geckodriver
}:

stdenv.mkDerivation {
  pname = "bias-detector";
  version = "0.1.0";

  src = ../../../.;

  nativeBuildInputs = with pkgs;[
    nodejs_20
    nodePackages.npm
    makeWrapper
  ];

  buildInputs = with pkgs; [
    firefox-developer-edition
    geckodriver
  ];

  buildPhase = ''
    export HOME=$(mktemp -d)
    npm ci
    npm run build
  '';

  installPhase = ''
    mkdir -p $out/share/bias-detector
    cp -r build/* $out/share/bias-detector/
    
    mkdir -p $out/bin
    makeWrapper ${nodejs_20}/bin/node $out/bin/bias-detector \
      --add-flags "$out/share/bias-detector/server.js" \
      --prefix PATH : ${lib.makeBinPath [ firefox-developer-edition geckodriver ]}
  '';

  meta = with lib; {
    description = "A PWA that helps users identify and understand bias in web content";
    homepage = "https://github.com/yourusername/bias-detector";
    license = licenses.mit;
    maintainers = with maintainers; [ ];
    platforms = platforms.all;
  };
}
