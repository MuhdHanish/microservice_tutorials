# Use an existing docker iamge as a base
FROM alpine

# Download and install a dependency
RUN apk add --update redis
RUN apk add --update gcc

# Tell the iamge what to do when it starts as container
CMD [ "redis-server" ]