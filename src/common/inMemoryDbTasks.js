const Task = require('../resources/tasks/task.model');

const DB_TASKS = [];

DB_TASKS.push(new Task(), new Task());

const getAll = async boardId =>
  DB_TASKS.filter(task => task.boardId === boardId);

const get = async (boardId, id) =>
  DB_TASKS.find(task => task.boardId === boardId && task.id === id);

const create = async task => {
  DB_TASKS.push(task);
  return get(task.boardId, task.id);
};

const update = async (boardId, id, task) => {
  const index = DB_TASKS.findIndex(t => t.boardId === boardId && t.id === id);
  if (index === -1) {
    throw new Error("Task doesn't exist");
  }

  DB_TASKS[index] = { ...DB_TASKS[index], ...task };
  return get(boardId, id);
};

const remove = async (boardId, id) => {
  DB_TASKS.splice(
    DB_TASKS.indexOf(t => t.boardId === boardId && t.id === id),
    1
  );
};

module.exports = { getAll, get, create, update, remove };
