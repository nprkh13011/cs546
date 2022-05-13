const bandsRoutes = require('./bands');
const albumsRoutes = require('./albums');

const constructorMethod = (app) => {
  app.use('/bands', bandsRoutes);
  app.use('/albums', albumsRoutes);
  app.use('*', (req, res) => {
    res.sendStatus(404);
  });
};

module.exports = constructorMethod;