FROM registry.hub.docker.com/library/node:latest as build-stage
WORKDIR /app
COPY package.json package-lock.json server.js build.js ./
COPY src ./src
RUN npm ci
RUN npm run build
CMD [ "npm", "start" ]

FROM nginx:stable-alpine
COPY --from=build /app/dist /bin/www
# COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]
