#!/bin/bash -xe
CONTAINER_NAME=gmp-void-api
IMAGE_NAME=$CONTAINER_NAME

source ../.env

cd ..
docker rm -f "${CONTAINER_NAME}" || true
docker run \
    --name="${CONTAINER_NAME}" \
    -d \
    -it \
    --restart=unless-stopped \
    -p "${SERVER_PORT}:${SERVER_PORT}" \
    -v $(pwd)/.env:/opt/srv/.env:ro \
    ${IMAGE_NAME}:latest
cd -

docker logs -f "${CONTAINER_NAME}"
