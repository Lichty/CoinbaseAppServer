FROM node:14
#FROM node:current-alpine3.10 ##test this
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 3000
VOLUME [ "/app/node_modules" ]
CMD ["npm", "start"]