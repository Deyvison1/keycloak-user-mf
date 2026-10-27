# syntax=docker/dockerfile:1

# Etapa 1 - Build
FROM node:24-alpine AS build

WORKDIR /app

COPY package*.json ./
COPY .npmrc ./

RUN npm ci

COPY . .

RUN npm run build -- --configuration production

# Etapa 2 - Servir Angular
FROM node:24-alpine AS production

WORKDIR /app

RUN npm install -g serve

COPY --from=build /app/dist/keycloak-user-mf/browser ./dist

EXPOSE 80

CMD ["serve", "-s", "dist", "-l", "80", "--cors"]