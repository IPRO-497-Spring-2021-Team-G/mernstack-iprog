const router = require('express').Router();
let Table = require('../models/table.model');

router.route('/').get((req, res) => {
  Table.find()
    .then(tables => res.json(tables))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const tableName = req.body.tableName;
  const capacity = req.body.capacity;
  const description = req.body.description;
  const isempty=req.body.isempty;

  const newTable = new Table({
    tableName,
    capacity,
    description,
    isempty,
  });

  newTable.save()
    .then(() => res.json('new table added'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Table.findById(req.params.id)
    .then(table => res.json(table))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Table.findById(req.params.id)
    .then(table => {
     
      table.isempty = req.body.isempty;

      table.save()
        .then(() => res.json('table updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;