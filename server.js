const express = require('express');
const session = require('express-session');
const routes = require('./controllers');
//Importing the handlebar package and helper codes
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');
const path = require('path');
const cors = require('cors');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// Added 
const hbs = exphbs.create({ helpers });

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(cors());
app.use(session(sess));
// Adding view engine
app.engine('handlebars', hbs.engine);
// Setting default view engine
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Adding public folders to express static handlers
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening - PawsTime App - http://localhost:' + PORT + '/'));
});
