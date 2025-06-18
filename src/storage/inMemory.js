const storage = new Map();

const get = (key) => storage.get(key);

const set = (key, value) => storage.set(key, value);

module.exports = {
  get,
  set,
};
