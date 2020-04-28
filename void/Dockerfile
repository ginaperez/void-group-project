FROM node:lts-alpine

# This repository contains both server and frontend code in the same repo.
# This Dockerfile *only* runs the server-side component inside a container.
# The frontend site files are built and committed to GitHub and served out
# statically via nginx reverse proxy. Committing "dist" files to source
# are not best practice, but they are a pragmatic solution for non-production
# environments like this one. Ideally, there would be a separate Dockerfile
# (or part of this Dockerfile would be allocated) for building the frontend
# files, but it's overkill for this project.
# It's worth noting that part of this approach is motivated by the fact
# that npm packages take up a lot of space, and I don't want to bog down
# my cloud server's disk space with packages...

RUN mkdir -p /opt/srv

WORKDIR /opt/srv/server

# since we're using lts-alpine, the source repo for bcrypt does not seem
# to have a release for bcrypt on this architecture. So build it from source.
# python, gnu make, and g++ are required for building bcrypt from source
RUN apk add --no-cache make python g++

# to leverage proper image caching and reduce the number of times this layer
# gets built, install packages before copying over source code
COPY package.json /opt/srv/package.json

# package-lock.json is supposed to make builds deterministic, but
# it's causing issues, so I'll leave it commented for now
# COPY package-lock.json /opt/srv/package.json

# install packages
RUN npm install

# now copy over source code
COPY db /opt/srv/db
COPY server /opt/srv/server

# the .env file is important, this contains the connection strings
# for the postgres backend
# BUT YOU NEED TO MOUNT THIS AT RUNTIME! It's bad practice to cache
# credentials in image layers.
# COPY .env /opt/srv/.env

# the resulting image is about 550 megabytes. Prune build packages
RUN apk del python g++ make

WORKDIR /opt/srv

CMD ["node","./server/server.js"]
