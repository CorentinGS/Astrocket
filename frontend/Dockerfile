FROM node:18 AS runtime
WORKDIR /app

COPY . .

ENV HOST=0.0.0.0
ENV PORT=4321
ENV NODE_ENV=docker

RUN npm install
RUN npm run build


EXPOSE 4321
CMD node ./dist/server/entry.mjs