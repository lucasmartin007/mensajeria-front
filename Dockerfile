# FROM node:lts AS development

# WORKDIR /code
# COPY package.json /code/package.json
# COPY package-lock.json /code/package-lock.json

# RUN npm ci
# COPY . /code

# ENV CI=true
# ENV PORT=3001

# CMD [ "npm", "start" ]

# FROM development AS build

# RUN npm run build

# FROM nginx:1.13-alpine

# COPY --from=build /code/build /usr/share/nginx/html

# base image
FROM node:12.2.0-alpine

ENV REACT_APP_REDUX_DEVTOOLS_DISABLED=true

ADD package.json .
ADD package-lock.json .

RUN npm install --loglevel verbose

COPY . .

EXPOSE 3001

RUN npm run build

FROM nginx:1.14-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=0 /build /usr/share/mensajeria-front