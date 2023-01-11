FROM node:16-alpine3.14
COPY . /app

## run as production
EXPOSE 3000
ENV NODE_ENV prod
CMD [ "node", "build/src/main/server.js" ]