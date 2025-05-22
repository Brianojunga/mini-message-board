const db = require("../db/queries");

function formatedDate(datetime) {
  const date = new Date(datetime);
  const options = {
    // year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    // second: "2-digit",
    hour12: false,
  };
  return date.toLocaleString("en-US", options);
}

async function getMessage(req, res) {
  const rows = await db.getMessages();
  const formatedRows = rows.map((row) => {
    return {
      ...row,
      time: formatedDate(row.time),
    };
  });
  res.render("index", { title: "Message Board", rows: formatedRows });
}

function getNewForm(req, res) {
  res.render("new", { title: "Form" });
}

async function postMessage(req, res) {
  const { name, message } = req.body;
  await db.postMessage(name, message);
  res.redirect("/");
}

async function getAbout(req, res) {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).send("User ID is required");
    }

    const userId = Number(id);
    if (isNaN(userId)) {
      return res.status(400).send("User ID should be a number");
    }
    const user = await db.getUser(userId);
    res.render("about", { title: "About", user });
  } catch (err) {
    res.status(500).send("Server Error");
  }
}

module.exports = {
  getMessage,
  postMessage,
  getNewForm,
  getAbout,
};
