FROM node:6.4.0

RUN mkdir -p /src/app
WORKDIR /src/app
COPY package.json /src/app

RUN npm install gulp -g
RUN npm install bower -g

RUN npm link gulp

EXPOSE 9000 35729

CMD [ "sh", "-c", "npm install && cd app && bower install --allow-root && cd .. && gulp serve" ]
