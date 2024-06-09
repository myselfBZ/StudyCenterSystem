const { pool } = require("./db");

class Address {
  static async createAddress(city, district, street, house_number, user_id) {
    try {
      const query =
        "INSERT INTO addressdetails(city, district, street, house_number, user_id) VALUES($1, $2, $3, $4, $5)";
      const { rows } = await pool.query(query, [
        city,
        district,
        street,
        house_number,
        user_id,
      ]);
      return rows;
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = {
  Address,
};
