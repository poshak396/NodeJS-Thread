FROM node:18.12.1-alpine
WORKDIR /opt/app
COPY . .
RUN npm install
EXPOSE 3000
# CMD npm run start:dev