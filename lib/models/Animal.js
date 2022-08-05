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

  static async insert({ type, name, age }) {
    const { rows } = await pool.query(
      `INSERT INTO animals (type, name, age)
       VALUES ($1, $2, $3)
       RETURNING *;`, [type, name, age]
    );
    return new Animal(rows[0]);
  }

  static async updateById(id, newAttributes) {
    const animal = await Animal.getAnimalById(id);
    if (!animal) return null;

    const updatedAnimal = { ...animal, ...newAttributes };
    const { rows } = await pool.query(
      `UPDATE animals
       SET name = $2, type = $3, age = $4
       WHERE id = $1
       RETURNING *;`, [id, updatedAnimal.name, updatedAnimal.type, updatedAnimal.age]
    );
    return new Animal(rows[0]);
  }
}

module.exports = Animal;
