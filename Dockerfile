FROM node:8.11.3

WORKDIR /app

COPY package.json /app
RUN npm install
COPY . /app
EXPOSE 8080
CMD ["npm","start"]
