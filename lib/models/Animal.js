const pool = require('../utils/pool');

class Animal {
  id;
  type;
  name;
  age;

  constructor(row) {
    this.id = row.id;
    this.type = row.type;
    this.name = row.name;
    this.age = row.age;
  }

  static async getAllAnimals() {
    const { rows } = await pool.query(
      'SELECT * FROM animals;'
    );
    return rows.map((row) => new Animal(row));
  }

  static async getAnimalById(id) {
    const { rows } = await pool.query(
      `SELECT * FROM animals
       Where id = $1;`, [id]
    );
    if (rows.length === 0) {
      return null;
    }
    return new Animal(rows[0]);
  }
}

module.exports = Animal;
