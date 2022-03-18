# slingercode drive client

## Environment Variables

Create a `.env` file and insert the variables below

- `REACT_APP_SERVER_URL`: URL of the server

## Build image (local)

We can use the following script in order to build and run the image locally:

Create a file `docker-build.sh` and paste the script remplazing the ENV VARS with the
values in `.env` file

**NOTE: THIS FILE SHOULD NOT BE ADDED TO GIT**

```shell
docker build .\
  --build-arg REACT_APP_SERVER_URL="REACT_APP_SERVER_URL"\
  --tag slingercode-drive-client:$(git log -1 --format=%h) &&
docker run --name slingercode-drive-client -d -p 80:80 slingercode-drive-client:$(git log -1 --format=%h)
```

### Docker compose

In order to facilitate the build and execution of the client and server images,
we can create a `docker-compose.yml` file in a general context of the
two repositories:

```
client
  |
   - Dockerfile
server
  |
   - Dockerfile
.env
docker-compose.yml
```

To help this process, a `.env` file must be created with both versions, the server and the client

**NOTE: Both client and server repositories has the same `docker-compose.yml` version, and is only for development purpose**
