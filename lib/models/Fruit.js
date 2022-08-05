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

  static async insert({ name, color, goes_on_pizza }) {
    const { rows } = await pool.query(
      `INSERT INTO fruits (name, color, goes_on_pizza)
       VALUES ($1, $2, $3)
       RETURNING *;`, [name, color, goes_on_pizza]
    );
    return new Fruit(rows[0]);
  }

  static async updateFruit(id, newAttributes) {
    const fruit = await Fruit.getFruitById(id);
    if (!fruit) return null;

    const updatedFruit = { ...fruit, ...newAttributes };
    const { rows } = await pool.query(
      `UPDATE fruits
       SET goes_on_pizza = $2, name = $3, color = $4
       WHERE id = $1
       RETURNING *;`, [id, updatedFruit.goes_on_pizza, updatedFruit.name, updatedFruit.color]
    );
    return new Fruit(rows[0]);
  }
}

module.exports = Fruit;
