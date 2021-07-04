FROM node:12-alpine

RUN npm install -g npm
RUN apk add --no-cache libc6-compat

WORKDIR /usr/src/app

COPY package*.json /usr/src/app/
RUN npm i

COPY . /usr/src/app

EXPOSE 3000

ENV PORT 3000

CMD ["npm", "run", "dev"]