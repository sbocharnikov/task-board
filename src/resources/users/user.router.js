const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  res.json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res, next) => {
  const user = await usersService.get(req.params.id).catch(next);
  res.json(User.toResponse(user));
});

router.route('/').post(async (req, res) => {
  const user = await usersService.create(req.body);

  res.json(User.toResponse(user));
});

router.route('/:id').put(async (req, res, next) => {
  const user = await usersService.update(req.params.id, req.body).catch(next);
  res.json(User.toResponse(user));
});

router.route('/:id').delete(async (req, res) => {
  await usersService.remove(req.params.id);
  res.send('Successfully deleted');
});

module.exports = router;
