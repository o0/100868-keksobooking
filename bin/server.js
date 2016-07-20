'use strict';

const fs = require('fs');
const path = require('path');

const express = require('express');
const mime = require('mime');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');

const config = require('./webpack.config.js');


/** @constant {number} */
const PORT = 1506;

/** @enum {string} */
const Executables = ['.js'];


/**
 * @param {Request} req
 * @param {Response} res
 */
let sendWebpackFile = (req, res) => {
  res.write(middleware.fileSystem.readFileSync(
    path.resolve(config.devServer.entryPath, req)
  ));
};


/**
 * @param {Request} req
 * @param {Response} res
 */
let sendStaticFile = (req, res) => {
  let filename = path.join(config.devServer.contentBase,
                           req.url === '/' ? 'index.html' : req.url);

  let filecontent = null;
  try {
    filecontent = fs.readFileSync(filename);
    res.header('Content-Type', mime.lookup(filename));
    res.write(filecontent);
    res.send();
  } catch(err) {
    console.error('❌', err.message);
    res.status(404).send(err.message);
  }
};


/** @param {Request} req */
let sendExecutable = (req, res) => {
  if (Executables.indexOf(req.url) > -1) {
    sendWebpackFile(req, res);
  } else {
    sendStaticFile(req, res);
  }
};


// Setup server and enable webpack as a middleware
const app = express();
const compiler = webpack(config);
const middleware = webpackMiddleware(compiler, require('./middleware.config.js'));
app.use(middleware);


// Setup server routing
app.
  get('/api/*', (req, res) => {
    console.log('API request');
    res.status(200).send();
  }).
  get('*', (req, res) => {
    sendExecutable(req, res);
    res.end();
  });


// Start server
app.listen(PORT, '0.0.0.0', (err) => {
  if (err) {
    console.log(err);
  }

  console.info('==> 🌎 Проект запущен на порту %s. Откройте http://0.0.0.0:%s/ у себя в браузере', PORT, PORT);
});
