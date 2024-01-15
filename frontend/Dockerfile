# Stage 1: Build the project
FROM node:lts-alpine AS build

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

FROM node:lts-alpine AS dep

WORKDIR /app

COPY package.json yarn.lock ./

# install dependencies
RUN yarn install --frozen-lockfile --production
RUN yarn add sharp --ignore-engines


# Stage 2: Use Google Distroless as production image
FROM gcr.io/distroless/nodejs18:nonroot AS production

WORKDIR /app

# Copy the built project from the runtime stage
COPY --from=build  /app .
COPY --from=dep  /app/node_modules ./node_modules


ENV HOST=0.0.0.0
ENV PORT=4321
ENV NODE_ENV=dev

USER nonroot

EXPOSE 4321
CMD node ./dist/server/entry.mjs