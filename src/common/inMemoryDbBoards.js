const Board = require('../resources/boards/board.model');

const DB_BOARDS = [];

DB_BOARDS.push(new Board(), new Board());

const getAll = async () => DB_BOARDS.slice(0);

const get = async id => DB_BOARDS.find(board => board.id === id);

const create = async board => {
  DB_BOARDS.push(board);
  return get(board.id);
};

const update = async (id, board) => {
  const index = DB_BOARDS.findIndex(u => u.id === id);
  if (index === -1) {
    throw new Error("board doesn't exist");
  }

  DB_BOARDS[index] = { ...DB_BOARDS[index], ...board };
  return get(id);
};

const remove = async id => {
  DB_BOARDS.splice(
    DB_BOARDS.indexOf(b => b.id === id),
    1
  );
};

module.exports = { getAll, get, create, update, remove };