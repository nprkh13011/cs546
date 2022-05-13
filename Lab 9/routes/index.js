const primeRoutes = require('./prime');

const constructorMethod = (app) => {
  app.use('/', primeRoutes);
  app.use('*', (req, res) => {
    res.redirect('/');
  });
};

module.exports = constructorMethod;