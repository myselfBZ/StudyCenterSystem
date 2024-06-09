const { pool } = require("./db");

class Course {
  static async getStudents(id) {
    try {
      const query =
        "SELECT useraccount.* FROM useraccount JOIN enrollments ON useraccount.id = enrollments.student_id JOIN course ON enrollments.course_id = course.id WHERE course.id = $1";
      const { rows } = await pool.query(query, [id]);
      return rows;
    } catch (error) {
      throw new Error(err);
    }
  }
  static async create(
    courseName,
    startDate,
    endDate,
    maxStudents,
    minStudents,
    price,
    teacherId
  ) {
    const query =
      "INSERT INTO course (course_name, start_date, end_date, max_students, min_students, price, teacher_id) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id";
    const { rows } = await pool.query(query, [
      courseName,
      startDate,
      endDate,
      maxStudents,
      minStudents,
      price,
      teacherId,
    ]);
    return rows[0];
  }
  static async enroll(studentId, courseId) {
    const query =
      "INSERT INTO enrollments (student_id, course_id) VALUES($1, $2) RETURNING *";
    const { rows } = await pool.query(query, [studentId, courseId]);
    return rows[0];
  }
  static async delete(courseId) {
    const query = "DELETE FROM course WHERE id=$1";
    const { rowCount } = await pool.query(query, [courseId]);
    if (rowCount === 0) {
      return "course not found";
    }
    return "deleted";
  }
}

module.exports = {
  Course,
};
