// helpers/hash.js
const bcrypt = require("bcrypt");
const saltRounds = 10;

async function hashPassword(plainPassword, existingHash = null) {
  if (plainPassword && plainPassword.trim() !== "") {
    return await bcrypt.hash(plainPassword, saltRounds);
  } else if (existingHash) {
    return existingHash;
  }
  return null;
}

module.exports = { hashPassword };
