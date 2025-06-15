FROM node:20-alpine


RUN echo "hosts: files dns" > /etc/nsswitch.conf


RUN npm config delete proxy || true && \
    npm config delete https-proxy || true

WORKDIR /app


COPY package*.json ./


RUN npm install --legacy-peer-deps


COPY . .


EXPOSE 3000


CMD ["npm", "run", "start:prod"]