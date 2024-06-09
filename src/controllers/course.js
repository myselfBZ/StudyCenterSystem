const { Course } = require("../models/course");

class CourseAPIHandler {
  static async createCourse(req, res) {
    try {
      const course = req.body;
      const courseId = await Course.create(
        course.name,
        course.startDate,
        course.endDate,
        course.maxStudents,
        course.minStudents,
        course.price,
        course.teacherId
      );
      return res.status(201).json({ courseId: courseId.id });
    } catch (err) {
      console.log(err);
      return res.json({ error: "Error" });
    }
  }
  static async delete(req, res) {
    const id = req.params.id;
    const result = await Course.delete(id);
    return res.json({ message: result });
  }
  static async getStudents(req, res) {
    try {
      const id = req.params.id;
      const rows = await Course.getStudents(id);
      return res.status(200).json(rows);
    } catch (error) {
      return res.json(error);
    }
  }

  static async enroll(req, res) {
    const courseId = req.params.id;
    const { studentId } = req.body;
    const enrollment = await Course.enroll(studentId, courseId);
    return res.status(201).json(enrollment);
  }
}

module.exports = {
  CourseAPIHandler,
};
