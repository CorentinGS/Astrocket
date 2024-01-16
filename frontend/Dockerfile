# Stage 1: Build the project
FROM node:20-alpine AS build

ARG VERSION=dev

WORKDIR /app

ENV NODE_ENV=dev


COPY package.json yarn.lock ./

# install dependencies
RUN yarn install --frozen-lockfile
RUN yarn add sharp --ignore-engines

# Copy the application code
COPY . .

RUN yarn build

# remove development dependencies
RUN rm -rf node_modules

FROM node:20-alpine AS dep

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile --production && \
    yarn add sharp --ignore-engines && \
    yarn cache clean


RUN rm -rf /app/node_modules/typescript && \
    rm -rf /app/node_modules/prettier && \
    rm -rf /app/node_modules/@eslint && \
    rm -rf /app/node_modules/shikiji && \
    rm -rf /app/node_modules/@img && \
    rm -rf /app/node_modules/astro && \
    rm -rf /app/node_modules/@types/ \
    rm -rf /app/node_modules/lightningcss-linux-x64-gnu && \
    rm -rf /app/node_modules/lightningcss-linux-x64-musl

# Copy the built project from the runtime stage
COPY --from=build  /app .

ENV HOST=0.0.0.0
ENV PORT=4321
ENV NODE_ENV=dev

EXPOSE 4321
CMD ["node", "./dist/server/entry.mjs"]