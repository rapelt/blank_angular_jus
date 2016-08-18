
## Installation

Global dependencies

```
    npm install -g gulp bower
```

Clone project

```
    git clone https://github.com/epenkman/oss-cafe.git
    cd oss-cafe
    npm install
```

## Build and Run

Local developer preview
```
    gulp serve
```

Unit tests with karma.js
```
    gulp test
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

This project uses .editorconfig for code conventions, you may have to install a plugin for your editor to support .editorconfig files


## Project structure and architecture

This project uses a traditional angularjs project structure taken from the [angular.js yeoman generator] (https://github.com/yeoman/generator-angular)
