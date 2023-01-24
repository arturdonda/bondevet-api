FROM public.ecr.aws/docker/library/node:16-bullseye

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

EXPOSE 3000

ENV NODE_ENV prod

ENV SECRET $SECRET

CMD [ "node", "build/src/main/server.js" ]