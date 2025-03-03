FROM node:20-alpine AS builder

WORKDIR /app
COPY package.json package-lock.json /app/
RUN npm install --force
COPY . /app/
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

ENTRYPOINT [ "nginx","-g","daemon off;" ]