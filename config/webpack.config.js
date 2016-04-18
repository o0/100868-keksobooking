/**
 * @fileoverview Конфигурационный файл сборщика и web-сервера.
 * @author Igor Alexeenko (igor.alexeenko@htmlacademy.ru)
 */

const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const OUTPUT_DIRNAME = 'out';
const SRC_DIRNAME = 'src';

module.exports = {
  devServer: {
    contentBase: path.resolve(projectRoot, OUTPUT_DIRNAME)
  },

  entry: path.resolve(projectRoot, SRC_DIRNAME, 'main.js'),

  output: {
    filename: "main.js",
    path: path.resolve(projectRoot, OUTPUT_DIRNAME, 'js'),
    sourceMapFilename: "[file].map"
  }
};
