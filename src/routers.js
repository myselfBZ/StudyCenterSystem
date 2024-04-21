const express = require("express");
const { verifyToken } = require("./middleware");
const router = express.Router();
const { UserAPIHandler } = require("./controlles");
const { CourseAPIHandler } = require("./controlles");
router.post("/log-in/", UserAPIHandler.logIn);
router.post("/teachers/", verifyToken, UserAPIHandler.createTecher);
router.delete("/students/:id", verifyToken, UserAPIHandler.delteStudent);
router.get("/teachers/", verifyToken, UserAPIHandler.getTeachers);
router.get("/teachers/:id", verifyToken, UserAPIHandler.getTeacher);
router.get(
  "/teachers/:id/courses/",
  verifyToken,
  UserAPIHandler.getTeacherCourses
);
router.delete("/teachers/:id", verifyToken, UserAPIHandler.deleteTeacher);
router.post("/courses/", verifyToken, CourseAPIHandler.createCourse);
router.post("/students/", verifyToken, UserAPIHandler.createStudent);
router.post("/courses/:id/students/", verifyToken, CourseAPIHandler.enroll);
router.get("/courses/:id/students/", verifyToken, CourseAPIHandler.getStudents);
module.exports = {
  router,
};
