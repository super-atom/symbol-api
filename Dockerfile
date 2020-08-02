FROM node:lts
LABEL maintainer="super0atom@gmail.com"

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
COPY ./ ./
RUN npm run build

ENV NODE_ENV=development
ENV PORT=9406
EXPOSE 9406

CMD ["npm" ,"run", "start"]