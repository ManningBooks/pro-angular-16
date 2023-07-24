FROM node:18.14.0

RUN mkdir -p /usr/src/sportsstore

COPY dist/SportsStore/browser /usr/src/sportsstore/dist/SportsStore/browser
COPY ssl* /usr/src/sportsstore/ssl

COPY authMiddleware.js /usr/src/sportsstore/
COPY serverdata.json /usr/src/sportsstore/
COPY server.js /usr/src/sportsstore/server.js
COPY deploy-package.json /usr/src/sportsstore/package.json

WORKDIR /usr/src/sportsstore

RUN npm install

EXPOSE 80

CMD ["node", "server.js"]
