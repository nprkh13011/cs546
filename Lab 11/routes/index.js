const showsRoute = require('./shows');
// const express = require('express');

const constructorMethod = (app) => {
  app.use('/', showsRoute);
  app.use('*', (req, res) => {
    res.sendStatus(404);
  });
};

module.exports = constructorMethod;