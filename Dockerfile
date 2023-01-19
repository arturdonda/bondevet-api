FROM public.ecr.aws/docker/library/node:16-bullseye
COPY . /app

## run as production
EXPOSE 3000
ENV NODE_ENV prod
CMD [ "node", "build/src/main/server.js" ]