const User = require('./user.model');

const getAll = async () => User.find({}).lean();

const get = async id => {
  const user = await User.findById(id).lean();
  if (!user) {
    throw new Error(`The user with id ${id} was not found`);
  }

  return { ...user, id };
};

const create = async user => User.create(user);

const update = async (id, user) => User.updateOne({ _id: id }, user).lean();

const remove = async id => User.deleteOne({ _id: id });

module.exports = { getAll, get, create, update, remove };
