const MongoClient = require('mongodb').MongoClient;
const settings = {
  mongoConfig: {
    serverUrl: 'mongodb://localhost:27017/',
    database: 'Nidhi_Parekh_lab6'
  }
};
let _connection = undefined;
let _db = undefined;

module.exports = {
  dbConnection: async () => {
    if (!_connection) {
      _connection = await MongoClient.connect(settings.mongoConfig.serverUrl);
      _db = await _connection.db(settings.mongoConfig.database);
    }

    return _db;
  },
  closeConnection: () => {
    _connection.close();
  }
};