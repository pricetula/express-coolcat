FROM node:8.9.3

# Create app directory
RUN mkdir -p /app
WORKDIR /app

# Install app dependencies
COPY package.json /app
Run npm install

# Bundle app source
COPY . /app

EXPOSE 3030
CMD [ "npm", "start" ]