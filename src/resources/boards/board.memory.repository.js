const DB_BOARDS = require('../../common/inMemoryDbBoards');

const getAll = async () => DB_BOARDS.getAll();

const get = async id => {
  const board = await DB_BOARDS.get(id);

  if (!board) {
    throw new Error(`The board with id ${id} was not found`);
  }

  return board;
};

const create = async board => DB_BOARDS.create(board);

const update = async (id, board) => DB_BOARDS.update(id, board);

const remove = async id => DB_BOARDS.remove(id);

module.exports = { getAll, get, create, update, remove };
