const DB_TASKS = require('../../common/inMemoryDbTasks');

const getAll = async boardId => DB_TASKS.getAll(boardId);

const get = async (boardId, id) => {
  const task = await DB_TASKS.get(boardId, id);

  if (!task) {
    throw new Error(`The task with id ${id} was not found`);
  }

  return task;
};

const create = async task => DB_TASKS.create(task);

const update = async (boardId, id, task) => DB_TASKS.update(boardId, id, task);

const remove = async (boardId, id) => DB_TASKS.remove(boardId, id);

const removeByBoardId = async id => DB_TASKS.removeByBoardId(id);

const unassignUser = async id => DB_TASKS.unassignUser(id);

module.exports = {
  getAll,
  get,
  create,
  update,
  remove,
  removeByBoardId,
  unassignUser
};
