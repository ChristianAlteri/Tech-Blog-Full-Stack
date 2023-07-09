// Import dependencies
const express = require('express');
const session = require('express-session');
const routes = require('./controllers');
const exphbs = require('express-handlebars');
const Handlebars = require('handlebars');
// const methodOverride = require('method-override');


// Import sequelize and Store which is session saving
const { sequelize } = require('./config/connection');
const { Post, Comment } = require('./models');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Initialise handlebars instance and give nickname 'hbs' load helpers
const hbs = exphbs.create({
  extname: 'hbs',
  helpers: {
    formatDate: function (date) {
      const formattedDate = new Date(date);
    
      const day = String(formattedDate.getDate()).padStart(2, '0');
      const month = String(formattedDate.getMonth() + 1).padStart(2, '0');
      const year = String(formattedDate.getFullYear()).slice(-2);
    
      return `${day}/${month}/${year}`;
    },
    reverse: function (array) {
      return array.slice().reverse();
    },
    lookup: function (obj, key) {
      return obj[key];
    },
  },
});

// Initialise express instance and port
const app = express();
const PORT = process.env.PORT || 3001;

//  here we're telling our app(express) to put hbs(handlebars) as the view engine
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

//   telling express to use the middleware for session with the options provided in the variable 'sess'
app.use(session(sess));
// app.use(methodOverride('_method'));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);
// redirect because course required homepage to be landing page
app.get('/', (req, res) => {
  res.redirect('/home');
});

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
  });
});
