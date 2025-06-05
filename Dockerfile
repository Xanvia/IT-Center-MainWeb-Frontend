# Frontend Dockerfile
FROM node:20

WORKDIR /app
COPY . .

RUN npm install
RUN npm run build

EXPOSE 5000

CMD ["npm", "run", "start", "--", "-H", "0.0.0.0", "-p", "5000"]
