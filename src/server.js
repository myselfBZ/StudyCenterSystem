const express = require("express");
const app = express();
const { UserRouter } = require("./routes/users");
const { CourseRouter } = require("./routes/course");
app.use(express.json());
app.use("", CourseRouter);
app.use("", UserRouter);
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
