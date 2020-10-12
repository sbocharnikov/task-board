const DB_USERS = [];

const getAll = async () => DB_USERS.slice(0);

const get = async id => DB_USERS.find(user => user.id === id);

const create = async user => {
  DB_USERS.push(user);
  return get(user.id);
};

const update = async (id, user) => {
  const index = DB_USERS.findIndex(u => u.id === id);
  if (index === -1) {
    throw new Error("User doesn't exist");
  }

  DB_USERS[index] = { ...DB_USERS[index], ...user };
  return get(id);
};

const remove = async id => {
  DB_USERS.splice(
    DB_USERS.indexOf(u => u.id === id),
    1
  );
};

module.exports = { getAll, get, create, update, remove };
