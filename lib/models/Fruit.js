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
}

module.exports = Fruit;
