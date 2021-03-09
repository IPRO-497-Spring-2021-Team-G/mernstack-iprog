const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const tableName = req.body.tableName;
  const usedby = req.body.usedby;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);

  const newUser = new User({
    tableName,
    usedby,
    duration,
    date,
  });

  newUser.save()
  .then(() => res.json('user added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  newUser.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json('Exercise deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  User.findById(req.params.id)
    .then(user => {
      user.tableName = req.body.tableName;
      user.usedby = req.body.usedby;
      user.duration = Number(req.body.duration);
      user.date = Date.parse(req.body.date);

      user.save()
        .then(() => res.json('user updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;