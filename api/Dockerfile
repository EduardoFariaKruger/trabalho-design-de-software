# Usa uma imagem leve e compatível com Raspberry Pi (ARM)
FROM node:18-alpine

# Define o diretório de trabalho
WORKDIR /app

# Copia apenas os arquivos de dependência
COPY package*.json ./

COPY . .
# Instala dependências de produção e desenvolvimento (precisa do typescript para build)
RUN npm install

# Copia o restante do código da aplicação

# Compila o TypeScript para JavaScript
RUN npm run build

# Expõe a porta da API
EXPOSE 3000

# Comando de inicialização
CMD ["npm", "start"]
