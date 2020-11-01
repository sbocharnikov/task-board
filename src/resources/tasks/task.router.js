const router = require('express').Router({ mergeParams: true });
const Task = require('./task.model');
const tasksService = require('./task.service');

router.route('/').get(async (req, res) => {
  const tasks = await tasksService.getAll(req.params.boardId);
  res.json(tasks.map(Task.toResponse));
});

router.route('/:id').get(async (req, res, next) => {
  try {
    const task = await tasksService.get(req.params.boardId, req.params.id);
    res.json(Task.toResponse(task));
  } catch (e) {
    return next(e);
  }
});

router.route('/').post(async (req, res) => {
  const task = await tasksService.create({
    ...req.body,
    boardId: req.params.boardId
  });

  res.json(Task.toResponse(task));
});

router.route('/:id').put(async (req, res, next) => {
  const task = await tasksService
    .update(req.params.boardId, req.params.id, req.body)
    .catch(next);
  res.json(Task.toResponse(task));
});

router.route('/:id').delete(async (req, res) => {
  await tasksService.remove(req.params.boardId, req.params.id);
  res.send('Successfully deleted');
});

module.exports = router;
