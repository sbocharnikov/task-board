const uuid = require('uuid');

class Task {
  constructor({
    id = uuid(),
    title = 'Task',
    order = 0,
    description = 'task',
    userId = '1',
    boardId = '1',
    columnId = '1'
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  static toResponse(task) {
    const { id, title, order, description, userId, boardId, columnId } = task;
    return { id, title, order, description, userId, boardId, columnId };
  }
}

module.exports = Task;
