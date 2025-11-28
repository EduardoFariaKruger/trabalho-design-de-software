# Etapa 1 que vai buildar a aplicacao
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# aqui ele pega o arquivo transpilado na etapa 1 e roda de uma vez com o CMD npm start
# nao tem como rodar como npm run dev, o CMD executa so quando o docker ta no ar entao ja usamos o build pra funcionar certinho
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
COPY --from=build /app/dist ./dist
COPY swagger.yaml ./swagger.yaml
RUN npm install --omit=dev
EXPOSE 3000
CMD ["npm", "start"]
