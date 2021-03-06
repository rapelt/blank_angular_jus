## Installation

Clone project

```
    git clone ssh://git@servicesmadesimpler.govnet.qld.gov.au:7999/sc/application.git
    cd application
```
### Setting up development environment with Docker.

Install Docker (Docker Engine 1.10.0+ & Compose 1.6.0+). See [here][1] for OS X and [here][2] for windows.

 [1]: https://www.docker.com/products/docker#/mac
 [2]: https://www.docker.com/products/docker#/windows

Run the following command to check if docker is properly installed.
```
  docker version
```

From your code directory, run the command below:
```
  docker-compose up --build -d
```
This should setup your environment by installing the necessary dependencies your code need to run.
When you run `docker ps`, you should have output like this:
 ```
 CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                                              NAMES
055d88ec79fd        osscafe_oss         "sh -c 'npm install &"   About an hour ago   Up 54 seconds       0.0.0.0:9000->9000/tcp, 0.0.0.0:35729->35729/tcp   osscafe_oss_1
 ```
Take note of the container id.

You can ssh into the docker container with `docker exec -it ## bash`. Where ## is the container id.
  ```
  root@055d88ec79fd:/src/app#
```

The '/src/app' is the code directory within the docker container.
Within this directory you can run any gulp tasks or install npm dependencies.
e.g Running the unit test.

```
root@055d88ec79fd:/src/app# gulp test
[03:48:06] Using gulpfile /src/app/gulpfile.js
[03:48:06] Starting 'test'...
25 08 2016 03:48:08.868:INFO [karma]: Karma v1.2.0 server started at http://localhost:8080/
25 08 2016 03:48:08.870:INFO [launcher]: Launching browser PhantomJS with unlimited concurrency
25 08 2016 03:48:08.891:INFO [launcher]: Starting browser PhantomJS
25 08 2016 03:48:09.336:INFO [PhantomJS 2.1.1 (Linux 0.0.0)]: Connected on socket /#Ep-UnAhsF6HIzaLlAAAA with id 25676911
 PhantomJS 2.1.1 (Linux 0.0.0): Executed 3 of 3 SUCCESS (0 secs / 0.033 secs)
.
PhantomJS 2.1.1 (Linux 0.0.0): Executed 3 of 3 SUCCESS (0.042 secs / 0.033 secs)
[03:48:09] Finished 'test' after 2.6 s
```

Once the container is running, you can access the app on `http://localhost:9000/#/`


## Installation without docker

Global dependencies

```
    npm install -g gulp bower yeoman
```


## Build and Run

Install/Update dependencies
```
    npm install
```

Local developer preview   
```
    gulp serve
```

Unit tests with karma.js
```
    gulp test
```

E2E tests with phantom.js
```
    gulp e2e-phantom
```

Generate deployable artefact
```
    gulp build
```

Preview deployable artefact in the browser
```
    gulp serve:prod
```


## Developing

This project uses [semistandard](https://www.npmjs.com/package/semistandard) javascript format. Please install the relevant editor plugin and enable format on save.

`.eslintrc` is used internally by semistandard. Code can be checked by running

```
    gulp eslint
```
