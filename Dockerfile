FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig.json ./
COPY index.html ./

RUN npm install

COPY src/ ./src/

RUN npm run build

RUN npm install -g pm2

EXPOSE 6969 7070 7171

CMD ["pm2-runtime", "start", "dist/ecosystem.config.js"]
