FROM node:20-alpine
WORKDIR /app
COPY . .

RUN npm ci
RUN npm install -g pm2

EXPOSE 3000

RUN npm run build

CMD ["pm2-runtime", "start", "--name", "ducksolife-front"]
# CMD ["npm", "run", "start"]