const uuid = require('uuid');

const column = { id: uuid(), title: 'Column', order: 1 };

class Board {
  constructor({ id = uuid(), title = 'Board', columns = [column] } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  static toResponse(board) {
    return board;
  }
}

module.exports = Board;
