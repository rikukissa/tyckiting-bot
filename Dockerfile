FROM node:5.5.0
MAINTAINER Riku Rouvila riku.rouvila@futurice.com
ADD . .
RUN npm install
CMD node ./cli.js -H server -P 3000 -a d -n riku
