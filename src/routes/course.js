const express = require("express");
const { verifyToken } = require("./middleware");
const courseRouter = express.Router();
const { UserAPIHandler } = require("../controllers/users");
const { CourseAPIHandler } = require("../controllers/course");

courseRouter.delete("/courses/:id", verifyToken, CourseAPIHandler.delete);
courseRouter.delete("/teachers/:id", verifyToken, UserAPIHandler.deleteTeacher);
courseRouter.post("/courses/", verifyToken, CourseAPIHandler.createCourse);
courseRouter.post("/students/", verifyToken, UserAPIHandler.createStudent);
courseRouter.post(
  "/courses/:id/students/",
  verifyToken,
  CourseAPIHandler.enroll
);
courseRouter.get(
  "/courses/:id/students/",
  verifyToken,
  CourseAPIHandler.getStudents
);
module.exports = {
  CourseRouter,
};
