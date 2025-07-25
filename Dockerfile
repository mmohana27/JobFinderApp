# Dockerfile
FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install -g expo-cli && npm install

COPY . .

EXPOSE 8081
CMD ["npx", "expo", "start", "--web"]