const Task = require('./task.model');

const getAll = async boardId => Task.find({ boardId });

const get = async (boardId, id) => {
  const task = await Task.findOne({ boardId, _id: id });

  if (!task) {
    throw new Error(`The task with id ${id} was not found`);
  }

  return task;
};

const create = async task => Task.create(task);

const update = async (boardId, id, task) =>
  Task.findOneAndUpdate({ _id: id }, task);

const remove = async (boardId, id) =>
  Task.findOneAndRemove({ _id: id, boardId });

const removeByBoardId = async id => Task.deleteMany({ boardId: id });

const unassignUser = async id =>
  Task.updateMany({ userId: id }, { userId: null });

module.exports = {
  getAll,
  get,
  create,
  update,
  remove,
  removeByBoardId,
  unassignUser
};
