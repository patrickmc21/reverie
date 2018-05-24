const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const db = require('knex')(configuration);
const app = express();

app.set('port', process.env.PORT || 3000);

app.use(express.static(path.join(__dirname, './client/build')));

app.get('/api/v1/hosts', (req, res) => {
  db('robots').select()
    .then(robots => {
      res.status(200).json(robots);
    })
    .catch(error => {
      res.status(500).json({ error });
    });
});

app.listen(app.get('port'), () => {
  console.log(`server is listening on ${app.get('port')}`);
});

module.exports = { app, db };
