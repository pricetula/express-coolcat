FROM node:8.9.3

# Create app directory
RUN mkdir -p /dockerized
WORKDIR /dockerized

# Install app dependencies
COPY package.json /dockerized
Run npm install

# Bundle app source
COPY . /dockerized

EXPOSE 3000
CMD [ "npm", "start" ]