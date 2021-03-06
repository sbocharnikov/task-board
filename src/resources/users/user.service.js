const usersRepo = require('./user.memory.repository');
const tasksRepo = require('../tasks/task.memory.repository');

const getAll = () => usersRepo.getAll();

const get = id => usersRepo.get(id);

const create = user => usersRepo.create(user);

const update = (id, user) => usersRepo.update(id, user);

const remove = id =>
  usersRepo.remove(id).then(() => tasksRepo.unassignUser(id));

module.exports = { getAll, get, create, update, remove };
