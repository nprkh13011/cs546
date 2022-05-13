const authRoutes = require('./auth');
// const privateRoutes = require('./private');

const constructorMethod = (app) => {
  app.use('/', authRoutes);
  // app.use('/private', privateRoutes);
  app.use('*', (req, res) => {
    res.sendStatus(404);
  });
};

module.exports = constructorMethod;