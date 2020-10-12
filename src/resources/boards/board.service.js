const boardsRepo = require('./board.memory.repository');
const tasksRepo = require('../tasks/task.memory.repository');

const getAll = () => boardsRepo.getAll();

const get = id => boardsRepo.get(id);

const create = board => boardsRepo.create(board);

const update = (id, board) => boardsRepo.update(id, board);

const remove = id => {
  tasksRepo.removeByBoardId(id).then(() => boardsRepo.remove(id));
};

module.exports = { getAll, get, create, update, remove };
