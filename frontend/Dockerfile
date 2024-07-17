FROM node:21-alpine

# Create app directory
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

# Copy dependency definitions

COPY package.json ./
COPY package-lock.json ./

# Install dependecies

RUN npm install

RUN mkdir node_modules/.cache && chmod -R 777 node_modules/.cache

# Get all the code needed to run the app
COPY . ./

# Expose the port the app runs in
EXPOSE 3000

# Serve the app
CMD ["npm", "start"]