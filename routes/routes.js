const { Router } = require("express");
const userRouter = Router();
const {
  getMessage,
  postMessage,
  getNewForm,
  getAbout,
} = require("../controllers/controller");

userRouter.get("/", getMessage);
userRouter.get("/new", getNewForm);
userRouter.post("/new", postMessage);
userRouter.get("/:id", getAbout);

module.exports = userRouter;
