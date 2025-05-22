const express = require("express");
const app = express();
const path = require("path");
const userRouter = require("./routes/routes");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

app.use("/", userRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
