FROM node:alpine

WORKDIR /express-app

COPY package.json .

RUN npm ci

COPY . .

RUN npm run build

# EXPOSE 5005

CMD ["node", "./build/index.js"]
