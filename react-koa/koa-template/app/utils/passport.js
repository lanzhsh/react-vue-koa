// https://www.npmjs.com/package/bcrypt
const bcrypt = require('bcrypt');

const encrypt = async (password, saltTimes) => {
  const hash = await bcrypt.hash(password, saltTimes);
  return hash; 
};

const validate = async (password, hash) => {
  const match = await bcrypt.compare(password, hash);
  return match;
};

module.exports = {
  encrypt,
  validate
}
