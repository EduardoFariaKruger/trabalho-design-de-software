# Stage 1: Build TypeScript
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Production
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
COPY --from=build /app/dist ./dist
COPY swagger.yaml ./swagger.yaml
RUN npm install --omit=dev
EXPOSE 3000
CMD ["npm", "start"]
