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
  const robotRows = [ 
    'date_added', 
    'first_active', 
    'current_name', 
    'height', 
    'weight', 
    'intelligence_metric'
  ];

  for (let idx = 0; idx < robotRows.length; idx++) {
    if (!robot[robotRows[idx]]) {
      const message = `Invalid input, please supply a ${robotRows[idx]}`;
      return res.status(405).json({ message });
    }
  }

  db('robots')
    .insert(robot, ['id', ...robotRows])
    .then(robot => {
      return res.status(200).json(robot[0]);
    })
    .catch(error => {
      return res.status(500).json({ error });
    });
});

app.get('/api/v1/hosts/:id', (req, res) => {
  const { id } = req.params;

  db('robots').select().where('id', id)
    .then(robot => {
      if (robot.length > 0) {
        return res.status(200).json(robot[0]);
      } else {
        return res.status(404).json({message: 'Entry not found'});
      }
    })
    .catch(error => {
      return res.status(500).json(error);
    });
});

app.put('/api/v1/hosts/:id', (req, res) => {
  const { id } = req.params;
  const robot = req.body;
  const robotRows = [
    'id', 
    'date_added', 
    'first_active', 
    'current_name', 
    'height', 
    'weight', 
    'intelligence_metric'
  ];

  for (let idx = 0; idx < robotRows.length; idx++) {
    if (!robot[robotRows[idx]]) {
      const message = `Invalid input, input must include ${robotRows[idx]}`;
      return res.status(405).json({ message });
    }
  }

  db('robots').where('id', id).update(robot, [...robotRows])
    .then(robot => {
      if (robot.length > 0) {
        return res.status(200).json(robot[0]);
      } else {
        return res.status(404).json({message: 'Entry not found'});
      }
    });

});

app.delete('/api/v1/hosts/:id', (req, res) => {
  const { id } = req.params;

  db('robots').where('id', id).del()
    .then(deleted => {
      if (deleted === 1) {
        return res.status(200).json({message: 'Robot Data Deleted'});
      } else {
        return res.status(404).json({message: 'Entry not found'});
      }
    })
    .catch(error => {
      return res.status(500).json(error);
    }); 
});

app.listen(app.get('port'));

module.exports = { app, db };
