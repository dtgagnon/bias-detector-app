{ lib
, pkgs
, stdenv
, nodejs
, makeWrapper
}:

stdenv.mkDerivation {
  pname = "bias-detector";
  version = "0.1.0";

  src = ../../../.;

  nativeBuildInputs = with pkgs; [
    nodejs
    makeWrapper
  ];

  propagatedBuildInputs = with pkgs; [
    firefox
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
    source ${makeWrapper}/nix-support/setup-hook
    makeWrapper ${nodejs}/bin/node $out/bin/bias-detector \
      --add-flags "$out/share/bias-detector/server.js" \
      --prefix PATH : ${lib.makeBinPath [ firefox geckodriver ]}
  '';

  meta = with lib; {
    description = "A PWA that helps users identify and understand bias in web content";
    homepage = "https://github.com/yourusername/bias-detector";
    license = licenses.mit;
    maintainers = with maintainers; [ ];
    platforms = platforms.all;
  };
}
