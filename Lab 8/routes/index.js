const pagesRoute = require('./pages');
const express = require('express')

const constructorMethod = (app) => {
  app.use('/', pagesRoute);
  app.use('*', (req, res) => {
    res.sendStatus(404);
  });
};

module.exports = constructorMethod;