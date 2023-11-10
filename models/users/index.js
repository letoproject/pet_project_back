const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const usersPath = path.join(__dirname, "users.json");

const updateUsers = async (users) => {
  await fs.writeFile(usersPath, JSON.stringify(users, null, 2));
};

const getAll = async () => {
  const data = await fs.readFile(usersPath);
  return JSON.parse(data);
};

const getById = async (id) => {
  const users = await getAll();
  const result = users.find(item => item.id === id)
  if (!result) {
    return null;
  }
  return result;
};

const add = async ({name, email}) => {
  const users = await getAll();
  const newUser = {
    name,
    email,
    id: nanoid(),
  };
  users.push(newUser);
  await updateUsers(users);
  return newUser;
};

const updateById = async (id, {name, email}) => {
  const users = await getAll();
  const idx = users.findIndex((item) => item.id === id);
  if (idx === -1) {
    return null;
  }
  users[idx] = { id, name, email };
  await updateUsers(users);
  return users[idx]
};

const removeById = async (id) => {
  const users = await getAll()
  const idx = users.findIndex(item => item.id === id)
  if (idx === -1) {
    return null
  }
  const [removeUser] = users.splice(idx, 1)
  updateUsers(users)
  return removeUser
}

module.exports = {
  getAll,
  getById,
  add,
  updateById,
  removeById,
};
