FROM alpine:3.19 AS build

ARG PB_VERSION=0.20.7

RUN apk add --no-cache \
    unzip \
    ca-certificates \
    # this is needed only if you want to use scp to copy later your pb_data locally
    openssh && rm -rf /var/cache/apk/*

# download and unzip PocketBase
ADD https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_linux_amd64.zip /tmp/pb.zip
RUN unzip /tmp/pb.zip -d /pb/

# Runtime stage
FROM alpine:3.19

WORKDIR /pb

COPY --from=build /pb/pocketbase /pb/pocketbase
COPY ./pb_migrations /pb/pb_migrations

EXPOSE 8080

# start PocketBase
CMD ["/pb/pocketbase", "serve", "--automigrate", "--http=0.0.0.0:8080"]