FROM node:14.17.0-stretch as build



WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install



# Copy the build output to replace the default nginx contents.
COPY . .


# Expose port 80
EXPOSE 8080

CMD [ "node", "index.js" ]