const express = require("express");
const { verifyToken } = require("./middleware");
const UserRouter = express.Router();
const { UserAPIHandler } = require("../controllers/users");
UserRouter.post("/log-in/", UserAPIHandler.logIn);
UserRouter.post("/teachers/", verifyToken, UserAPIHandler.createTecher);
UserRouter.delete("/students/:id", verifyToken, UserAPIHandler.delteStudent);
UserRouter.get("/teachers/", verifyToken, UserAPIHandler.getTeachers);
UserRouter.get("/teachers/:id", verifyToken, UserAPIHandler.getTeacher);
UserRouter.get(
  "/teachers/:id/courses/",
  verifyToken,
  UserAPIHandler.getTeacherCourses
);

module.exports = {
  UserRouter,
};
