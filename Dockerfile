FROM public.ecr.aws/docker/library/node:16-alpine
WORKDIR /app
COPY . .

## install all dependencies and build project
RUN npm install
RUN npm run build

## remove all unnecessary files
RUN rm -rf @types node_modules src module-alias.ts .package-lock.json tsconfig.json
## install prod only dependencies
RUN npm install --only=prod

## run as production
EXPOSE 3000
ENV NODE_ENV prod
CMD [ "node", "build/src/main/server.js" ]