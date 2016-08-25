FROM node:6.4.0

RUN mkdir -p /src/app
WORKDIR /src/app
COPY package.json /src/app


RUN npm install gulp -g
RUN npm install bower -g

RUN npm link gulp

##Install java 8, to be able to run end to end test
RUN touch /etc/apt/sources.list.d/java-8-debian.list
RUN echo "deb http://ppa.launchpad.net/webupd8team/java/ubuntu trusty main\ndeb-src\
 http://ppa.launchpad.net/webupd8team/java/ubuntu trusty main" >>\
 /etc/apt/sources.list.d/java-8-debian.list

RUN apt-key adv --keyserver keyserver.ubuntu.com --recv-keys EEA14886
RUN apt-get update
RUN echo oracle-java8-installer shared/accepted-oracle-license-v1-1\
 select true | /usr/bin/debconf-set-selections
RUN apt-get install -y oracle-java8-installer
##java installation ends

EXPOSE 9000 35729

CMD [ "sh", "-c", "npm install && cd app && bower install --allow-root && cd .. && gulp serve" ]
