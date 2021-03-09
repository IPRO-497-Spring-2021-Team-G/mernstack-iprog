const router = require('express').Router();
let Table = require('../models/table.model');

router.route('/').get((req, res) => {
  Table.find()
    .then(tables => res.json(tables))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const tableName = req.body.tableName;

  const newTable = new Table({tableName});

  newTable.save()
    .then(() => res.json('new table added'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;