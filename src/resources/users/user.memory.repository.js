const DB_USERS = require('../../common/inMemoryDbUsers');

const getAll = async () => DB_USERS.getAll();

const get = async id => {
  const user = await DB_USERS.get(id);

  if (!user) {
    throw new Error(`The user with id ${id} was not found`);
  }

  return user;
};

const create = async user => DB_USERS.create(user);

const update = async (id, user) => DB_USERS.update(id, user);

const remove = async id => DB_USERS.remove(id);

module.exports = { getAll, get, create, update, remove };
