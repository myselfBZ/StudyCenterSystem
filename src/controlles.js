const { User } = require("./models");
const { Address } = require("./models");
const { Course } = require("./models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
class UserAPIHandler {
  static async logIn(req, res) {
    const { phonenumber, password } = req.body;
    const user = await User.findUser(phonenumber);
    if (!user) {
      return res.status(404).json({ message: "wrong username or password" });
    }

    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) {
      return res.status(404).json({ message: "wrong username or password" });
    }
    const token = jwt.sign(
      { id: user.id, isAdmin: user.is_admin },
      "MYSECRETKEY",
      { expiresIn: "2h" }
    );
    return res.json({ message: "You are logged in", token: token });
  }
  static async delteStudent(req, res) {
    try {
      const studentId = req.params.id;
      const { courseId } = req.body;
      const result = await User.deleteStudent(studentId, courseId);
      return res.json({ message: result });
    } catch (err) {
      console.log(err);
    }
  }
  static async createTecher(req, res) {
    if (!req.isAdmin) {
      return res.status(401).json({ message: "Unauthorized access!" });
    }
    try {
      const user = req.body;
      const address = user.address;
      console.log(user);
      console.log(address);
      const hashPass = await bcrypt.hash(user.password, 10);
      const userId = await User.createUser(
        user.firstName,
        user.lastName,
        user.phonenumber,
        hashPass,
        user.isStaff,
        user.isAdmin
      );
      const addressId = await Address.createAddress(
        address.city,
        address.district,
        address.street,
        address.house_number,
        userId.id
      );
      return res.json({ message: "user has been created successfully" });
    } catch (err) {
      console.log(err);
    }
  }

  static async getTeachers(req, res) {
    const rows = await User.getTeachers();
    return res.status(200).json(rows);
  }

  static async getTeacher(req, res) {
    try {
      const id = req.params.id;
      const teacher = await User.getTeacher(id);
      return res.status(200).json(teacher);
    } catch (err) {
      console.error(err);
    }
  }
  static async getTeacherCourses(req, res) {
    try {
      const id = req.params.id;
      const rows = await User.getTeacherCourses(id);
      return res.json(rows);
    } catch (err) {
      return res.status(404).json({ message: "Wrong teacher id!" });
    }
  }
  static async createStudent(req, res) {
    try {
      const student = req.body;
      const studentId = await User.createStudent(
        student.firstName,
        student.lastName,
        student.phonenumber
      );
      return res.status(201).json({ studentId: studentId });
    } catch (err) {
      console.log(err);
      return res.json({ message: "Error" });
    }
  }
}

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
  UserAPIHandler,
};
