FROM  golang:1.22-alpine AS build

ARG PB_VERSION=0.20.7

RUN apk add --no-cache \
    unzip \
    ca-certificates \
    upx \
    # this is needed only if you want to use scp to copy later your pb_data locally
    openssh && rm -rf /var/cache/apk/*

# download and unzip PocketBase
ADD https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_linux_amd64.zip /tmp/pb.zip
RUN unzip /tmp/pb.zip -d /pb/

WORKDIR /build

COPY go.mod .
COPY go.sum .
COPY main.go .

RUN go get -d -v . \
    && CGO_ENABLED=0 go build -ldflags="-s -w" -o /pb/main main.go \
    && upx /pb/main

# Runtime stage
FROM alpine:3.19

WORKDIR /pb

COPY --from=build /pb/pocketbase /pb/pocketbase
COPY --from=build /pb/main /pb/main
COPY ./pb_migrations /pb/pb_migrations

EXPOSE 8080

# start PocketBase
CMD ["/pb/main", "serve", "--http=0.0.0.0:8080"]