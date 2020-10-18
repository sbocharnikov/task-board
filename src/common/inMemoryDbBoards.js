const DB_BOARDS = [];

const getAll = async () => DB_BOARDS.slice(0);

const get = async id => DB_BOARDS.find(board => board.id === id);

const create = async board => {
  DB_BOARDS.push(board);
  return get(board.id);
};

const update = async (id, board) => {
  const index = DB_BOARDS.findIndex(b => b.id === id);
  if (index === -1) {
    throw new Error("board doesn't exist");
  }

  DB_BOARDS[index] = { ...DB_BOARDS[index], ...board };
  return get(id);
};

const remove = async id => {
  const index = DB_BOARDS.findIndex(b => b.id === id);
  if (index >= 0) {
    DB_BOARDS.splice(index, 1);
  }
};

module.exports = { getAll, get, create, update, remove };
