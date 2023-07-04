const express = require("express");
const fileUpload = require("express-fileupload");

const authRoutes = require("./routes/auth");
const problemRoutes = require("./routes/problem");
const resourceRoutes = require("./routes/resource");
const sectionRoutes = require("./routes/section");
const topicRoutes = require("./routes/topic");
const userRoutes = require("./routes/user");
const suggestionRoutes = require("./routes/suggestion");

const sequelize = require("./util/database");
const User = require("./models/user");

const app = express();

app.use(
  fileUpload({
    limits: {
      fileSize: 10000000,
    },
    abortOnLimit: true,
  })
);

app.use(express.json({ limit: "10mb" }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/auth", authRoutes);
app.use("/problem", problemRoutes);
app.use("/resource", resourceRoutes);
app.use("/section", sectionRoutes);
app.use("/topic", topicRoutes);
app.use("/user", userRoutes);
app.use("/suggestion", suggestionRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

sequelize
  // .sync({ force: true })
  .sync()
  .then((result) => {
    app.listen(3001);
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = app;
