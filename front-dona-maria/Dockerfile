#Furuta mandou usar alpine pra tudo mesmo...
FROM node:20-alpine AS builder

WORKDIR /app


COPY package*.json ./
COPY tsconfig.json ./
COPY next.config.* ./
COPY . .

RUN npm install
RUN npm run build

FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Joga a porta pra 4000 pra não dar confusão depois na API
ENV PORT=4000
ENV NEXT_PORT=4000

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./

RUN npm install --omit=dev

EXPOSE 4000

CMD ["npm", "start", "--", "-p", "4000"]
