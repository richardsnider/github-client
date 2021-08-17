FROM registry.hub.docker.com/library/node:latest as build-deps
WORKDIR /usr/src/app
COPY package.json package-lock.json server.js ./
COPY src ./src
RUN npm ci
RUN npm run build
CMD [ "npm", "start" ]
