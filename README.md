## Installation

```
# install all the dependencies
npm install
npm install webpack-dev-server -g

# copy and edit the configuration file
cp source/settings.js.example source/settings.js

# run the sample server
webpack-dev-server --history-api-fallback

```

## Dependencies

AC2-frontend use webpack to manage its assets, the code itself is written in ES6 and requires Babel to transpile.

To better understand the code, you should take a look at:

* react
* redux
* material-ui
* react-router
* flexboxgrid
