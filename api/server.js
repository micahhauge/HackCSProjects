'use strict';

const express = require('express');
const app = express();
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const cors = require('cors');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


/* database stuff */
const sequelize = new Sequelize('postgres://postgres@db:5432/postgres');


// test the connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


// define a model for a project
const Project = sequelize.define('project', {
  name: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.STRING
  },
  creator_name: {
    type: Sequelize.STRING
  },
  creator_id: {
    type: Sequelize.STRING
  }
});

// force: true will drop the table if it already exists
Project.sync({force: true}).then(() => {
  // Table created
  return Project.create({
    name: 'Project 1',
    description: 'my first project',
    creator_id: 'github|16975119',
    creator_name: 'Micah Hauge',
  });
});

Project.findAll({
  attributes: { exclude: ['_changed', '_modelOptions', '_opition'] }
}).then(projects => {
  console.log(projects)
})




// get projects
app.get('/', function (req, res) {
  res.send('POST request to the homepage')
})





// route to greate database
app.get('/', function (req, res) {
  sequelize
    .drop()
    .then(() => {
      sequelize.sync()
        .then(() => {
          res.send('Database created');
        })
        .catch((err) => {
          res.send(err);
        })
    })
})





// GET method route
app.get('/', function (req, res) {
  res.send('GET request to the homepage');
})

// POST method route
app.post('/', function (req, res) {
  res.send('POST request to the homepage')
})






const authCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: "https://micahhauge.auth0.com/.well-known/jwks.json"
    }),
    audience: 'https://startupbattle.com',
    issuer: "https://micahhauge.auth0.com/",
    algorithms: ['RS256']
});


app.get('/api/projects/public', (req, res) => {
  let projects = [
  {
    id: 1111,
    name: 'Android Api',
    creator: 'Alec Pesola',
    github: 'https://github.com/micahhauge/IssueTracker',
    description: 'A cool project where we do cool things!',
  },
  {
    id: 1112,
    name: 'Startup Ontario',
    creator: 'Ryan Chenkie',
    github: '750k'
  },
  {
    id: 1113,
    name: 'Startup Uttah',
    creator: 'Diego Poza',
    github: '550k'
  },
  {
    id: 1114,
    name: 'Startup Australia',
    creator: 'Eugene Kogan',
    github: '500k'
  },
  {
    id: 1115,
    name: 'Startup Buenos Aires',
    creator: 'Sebastian Peyrott',
    github: '600k'
  },
  {
    id: 1116,
    name: 'Startup Lagos',
    creator: 'Prosper Otemuyiwa',
    github: '650k'
  },
  {
    id: 1117,
    name: 'Startup Oslo',
    creator: 'Mark Fish',
    github: '600k'
  },
  {
    id: 1118,
    name: 'Startup Calabar',
    creator: 'Christian Nwamba',
    github: '800k'
  },
  {
    id: 1119,
    name: 'Startup Nairobi',
    creator: 'Aniedi Ubong',
    github: '700k'
  }];

  res.json(projects);
})

app.get('/api/projects/private', authCheck, (req,res) => {
  let privateBattles = [
  {
    id: 2111,
    name: req.user,
    sponsor: 'Mark Zuckerberg',
    seedFund: '10M'
  },
  {
    id: 2112,
    name: 'Startup Vegas',
    sponsor: 'Bill Gates',
    seedFund: '20M'
  },
  {
    id: 2113,
    name: 'Startup Addis-Ababa',
    sponsor: 'Aliko Dangote',
    seedFund: '8M'
  },
  {
    id: 2114,
    name: 'Startup Abuja',
    sponsor: 'Femi Otedola',
    seedFund: '5M'
  },
  {
    id: 2115,
    name: 'Startup Paris',
    sponsor: 'Jeff Bezos',
    seedFund: '1.6M'
  },
  {
    id: 2117,
    name: 'Startup Oslo',
    sponsor: 'Paul Graham',
    seedFund: '2M'
  },
  {
    id: 2118,
    name: 'Startup Bangkok',
    sponsor: 'Jeff Clavier',
    seedFund: '5M'
  },
  {
    id: 2119,
    name: 'Startup Seoul',
    sponsor: 'Paul Buchheit',
    seedFund: '4M'
  }];

  res.json(privateBattles);
})

app.listen(3333);
console.log('Listening on localhost:3333');
