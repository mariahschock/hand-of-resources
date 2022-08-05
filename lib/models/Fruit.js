const pool = require('../utils/pool');

class Fruit {
  id;
  name;
  color;
  goes_on_pizza;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.color = row.color;
    this.goes_on_pizza = row.goes_on_pizza;
  }

  static async getAllFruits() {
    const { rows } = await pool.query(
      'SELECT * FROM fruits;'
    );
    return rows.map((row) => new Fruit(row));
  }

  static async getFruitById(id) {
    const { rows } = await pool.query(
      `SELECT * FROM fruits
       WHERE id = $1;`, [id]
    );
    if (rows.length === 0) {
      return null;
    }
    return new Fruit(rows[0]);
  }
}

module.exports = Fruit;
