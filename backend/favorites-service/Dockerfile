
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .
RUN npm run build


FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production --legacy-peer-deps

COPY --from=builder /app/dist ./dist

EXPOSE 3001

CMD ["node", "dist/main"]