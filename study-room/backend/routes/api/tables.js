// Use express router
const router = require('express').Router();
const auth = require('../../middleware/auth');

// Bring in Table model from the models folder
let Table = require('../../models/Table');

// @route   GET routes/tables
// @desc    Get all tables
// @access  Public
router.route('/').get((req, res) => {
  Table.find()
    .then(tables => res.json(tables))
    .catch(err => res.status(400).json('Error: ' + err));
});

// @route   GET routes/tables/:id
// @desc    Find a table
// @access  Public
router.route('/:id').get((req, res) => {
  // Find a table by fetching id through a URI
Table.findById(req.params.id)
  .then(table => res.json(table))
  .catch(err => res.status(400).json('Error: ' + err));
});

// @route   POST routes/tables/:id
// @desc    Update a table
// @access  Public
router.post('/update/:id', (req, res) => {
Table.findById(req.params.id)
  .then(table => {
    table.isEmpty = req.body.isEmpty;

    table.save()
      .then(() => res.json('Table updated!'))
      .catch(err => res.status(400).json('Error: ' + err));
  })
  .catch(err => res.status(400).json('Error: ' + err));
});

// @route   POST routes/tables
// @desc    Create a table
// @access  Private
router.post('/add', auth, (req, res) => {
  const tableName = req.body.tableName;
  const capacity = req.body.capacity;
  const description = req.body.description;
  const isEmpty = req.body.isEmpty;

  const newTable = new Table({
    tableName,
    capacity,
    description,
    isEmpty,
  });

  newTable.save()
    .then(() => res.json('New table added.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// @route   DELETE routes/tables/:id
// @desc    Delete a table
// @access  Private
router.delete('/:id', auth, (req, res) => {
  // Find an item by fetching id through a URI
  Table.findById(req.params.id)
    .then(table => table.remove().then(() => res.json({success: true})))
    .catch(err => res.status(404).json({success: false}));
});

module.exports = router;