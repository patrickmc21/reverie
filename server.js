const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const db = require('knex')(configuration);
const app = express();

app.set('port', process.env.PORT || 3000);

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './client/build')));

app.get('/api/v1/hosts', (req, res) => {
  db('robots').select()
    .then(robots => {
      return res.status(200).json(robots);
    })
    .catch(error => {
      return res.status(500).json({ error });
    });
});

app.post('/api/v1/hosts', (req, res) => {
  const robot  = req.body;
  db('robots')
    .insert(robot, [
        'id',
        'date_added',
        'first_active',
        'current_name',
        'height',
        'weight',
        'intelligence_metric'
    ])
    .then(robot => {
      return res.status(200).json(robot[0])
    })
    .catch(error => {
      return res.status(500).json({ error });
    });
});

app.listen(app.get('port'), () => {
  console.log(`server is listening on ${app.get('port')}`);
});

module.exports = { app, db };
