const userApiRoutes = require('./userApi');

const constructorMethod = (app) => {
  app.use('/', userApiRoutes);
  app.use('*', (req, res) => {
    res.status(404).json({ error: 'Route Not found' });
  });
};

module.exports = constructorMethod;