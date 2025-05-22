const pool = require("./pool.js");

async function getMessages() {
  const { rows } = await pool.query("SELECT * FROM board");
  return rows;
}

async function postMessage(name, message) {
  await pool.query("INSERT INTO board (name, message) VALUES ($1, $2)", [
    name,
    message,
  ]);
}

async function getUser(id) {
  const { rows } = await pool.query("SELECT * FROM board WHERE id = $1", [id]);
  return rows[0];
}

module.exports = {
  getMessages,
  postMessage,
  getUser,
};
