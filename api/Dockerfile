# =============================
# Stage 1: Build TypeScript
# =============================
FROM node:20-alpine AS build

# Diretório de trabalho dentro do container
WORKDIR /app

# Copia package.json e package-lock.json (ou yarn.lock) primeiro
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia todo o código-fonte
COPY . .

# Compila TypeScript para JavaScript
RUN npm run build

# =============================
# Stage 2: Production
# =============================
FROM node:20-alpine

WORKDIR /app

# Copia apenas os arquivos necessários da build
COPY package*.json ./
COPY --from=build /app/dist ./dist

# Instala apenas dependências de produção
RUN npm install --omit=dev

# Expõe a porta que seu app usa
EXPOSE 3000

# Comando para rodar a API
CMD ["npm", "start"]
