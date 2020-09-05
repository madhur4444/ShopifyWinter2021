FROM node:latest
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
COPY shckeys.json /app
RUN npm install -g typescript
RUN npm install
COPY . /app
EXPOSE 5000
CMD ["npm", "run", "prod"]