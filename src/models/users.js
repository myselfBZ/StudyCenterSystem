const { pool } = require("./db");

class User {
  static async getTeachers() {
    const query =
      "SELECT phone_number, first_name, last_name FROM useraccount WHERE is_staff='1' AND is_admin='0'";
    const { rows } = await pool.query(query);
    return rows;
  }
  static async deleteTeacher(newTeacher, oldTeacher) {
    await pool.query(
      "UPDATE course SET teacher_id = $1 WHERE teacher_id = $2",
      [newTeacher, oldTeacher]
    );
    const { rows } = await pool.query("DELETE FROM useraccount WHERE id = $1", [
      oldTeacher,
    ]);
    return rows;
  }
  static async deleteStudent(studentId, courseId) {
    try {
      const userQueryResult = await pool.query(
        "SELECT * FROM useraccount WHERE id=$1",
        [studentId]
      );

      if (userQueryResult.rows.length === 0) {
        return "User not found";
      }

      await pool.query("BEGIN");
      await pool.query(
        "DELETE FROM enrollments WHERE student_id = $1 AND course_id = $2",
        [studentId, courseId]
      );
      await pool.query("DELETE FROM useraccount WHERE id = $1", [studentId]);
      await pool.query("COMMIT");

      return "Deleted successfully";
    } catch (error) {
      await pool.query("ROLLBACK");
      throw error;
    }
  }
  static async getTeacher(id) {
    const query =
      "SELECT phone_number, first_name, last_name FROM useraccount WHERE id=$1";
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }
  static async findUser(phonenumber) {
    const query = "SELECT * FROM useraccount WHERE  phone_number=$1";
    const { rows } = await pool.query(query, [phonenumber]);
    return rows[0];
  }
  static async createSuperUser(
    firstName,
    lastName,
    phonenumber,
    hashedPass,
    isStaff = true,
    isAdmin = true
  ) {
    const query =
      "INSERT INTO useraccount(phone_number, first_name, last_name, password, is_staff, is_admin) VALUES($1, $2, $3, $4, $5, $6) RETURNING id";
    const { rows } = await pool.query(query, [
      phonenumber,
      firstName,
      lastName,
      hashedPass,
      isStaff,
      isAdmin,
    ]);
    return rows[0];
  }
  static async createTeacher(
    firstName,
    lastName,
    phonenumber,
    hashedPass,
    isStaff = true,
    isAdmin = false
  ) {
    const query =
      "INSERT INTO useraccount(phone_number, first_name, last_name, password, is_staff, is_admin) VALUES($1, $2, $3, $4, $5, $6) RETURNING id";
    const { rows } = await pool.query(query, [
      phonenumber,
      firstName,
      lastName,
      hashedPass,
      isStaff,
      isAdmin,
    ]);
    return rows[0];
  }
  static async createStudent(
    firstName,
    lastName,
    phonenumber,
    isStaff = false,
    isAdmin = false
  ) {
    const query =
      "INSERT INTO useraccount(phone_number, first_name, last_name, is_staff, is_admin) VALUES($1, $2, $3, $4, $5) RETURNING id";
    const { rows } = await pool.query(query, [
      phonenumber,
      firstName,
      lastName,
      isStaff,
      isAdmin,
    ]);
    return rows[0].id;
  }
  static async getTeacherCourses(id) {
    const query = "SELECT * FROM course WHERE teacher_id = $1";
    const { rows } = await pool.query(query, [id]);
    return rows;
  }
}

module.exports = {
  User,
};
