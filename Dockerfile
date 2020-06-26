FROM node:13.12.0-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./
RUN npm install --no-package-lock
RUN npm install react-scripts

COPY . ./

EXPOSE 3000

ENV CI true

CMD ["npm", "start"]
