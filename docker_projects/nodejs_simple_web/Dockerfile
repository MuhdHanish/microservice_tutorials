# Use a base image
FROM node:alpine

# Set the working directory inside the container
WORKDIR /usr/app

# Copy package.json and package-lock.json first to leverage cache
COPY ./package.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files, excluding the ones in .dockerignore
COPY ./ ./

# Expose the port the app runs on
EXPOSE 8000

# Command to run the application
CMD ["npm", "start"]
