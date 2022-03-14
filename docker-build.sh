docker build . --tag slingercode-drive-client:$(git log -1 --format=%h) &&
  docker run --name slingercode-drive-client -d -p 80:80 slingercode-drive-client:$(git log -1 --format=%h)