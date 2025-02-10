FROM node:alpine AS builder

WORKDIR /app
COPY package.json package-lock.json /app/
RUN npm install
COPY . /app/
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

ENTRYPOINT [ "nginx","-g","daemon off;" ]