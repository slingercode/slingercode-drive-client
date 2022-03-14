FROM node:16.14.0-alpine as build

WORKDIR /usr/app

COPY [".", "./"]

RUN npm install --prod && npm run build

FROM nginx:1.20.2-alpine

COPY --from=build /usr/app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
