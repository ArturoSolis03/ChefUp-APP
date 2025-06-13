# Usamos imagen oficial de Node.js con soporte para ARM64/AMD64, la versión 20 (puedes cambiarla si quieres)
FROM node:20-alpine

# Carpeta de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copiar package.json y package-lock.json (si tienes)
COPY package*.json ./

# Instalar dependencias
RUN npm install --production

# Copiar todo el código fuente
COPY . .

# Compilar TypeScript
RUN npm run build

# Exponer puerto que usa el servicio (3001 según tu .env)
EXPOSE 3001

# Comando para iniciar el servicio en producción
CMD ["npm", "run", "start:prod"]