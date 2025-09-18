# syntax=docker/dockerfile:1

FROM node:latest

WORKDIR /app

COPY . .

RUN rm -rf node_modules
RUN npm i
RUN npx prisma generate

CMD ["npm", "start"]

EXPOSE 3000