const express = require('express');
const app = express();
const static = express.static(__dirname + '/public');
const configRoutes = require('./routes');
const exphbs = require('express-handlebars');
// const Handlebars = require('handlebars');



app.use('/public', static);
app.use(express.json());
app.use(express.urlencoded({extended: true}));
// app.use(rewriteUnsupportedBrowserMethods);

// app.engine('handlebars', handlebarsInstance.engine);
// app.set('view engine', 'handlebars');

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});