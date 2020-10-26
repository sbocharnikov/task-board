const Board = require('./board.model');

const getAll = async () => Board.find({});

const get = async id => {
  const board = await Board.findOne({ _id: id });

  if (!board) {
    throw new Error(`The board with id ${id} was not found`);
  }

  return board;
};

const create = async board => Board.create(board);

const update = async (id, board) => Board.findOneAndUpdate({ _id: id }, board);

const remove = async id => {
  const board = Board.remove({ _id: id });

  if (!board) {
    throw new Error(`The board with id ${id} was not found`);
  }
};

module.exports = { getAll, get, create, update, remove };
