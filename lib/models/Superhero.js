const pool = require('../utils/pool');

class Superhero {
  id;
  name;
  secret_identity;
  universe;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.secret_identity = row.secret_identity;
    this.universe = row.universe;
  }

  static async getAllSuperheros() {
    const { rows } = await pool.query(
      'SELECT * FROM superheros;'
    );
    return rows.map((row) => new Superhero(row));
  }

  static async getSuperheroById(id) {
    const { rows } = await pool.query(
      `SELECT * FROM superheros
       WHERE id = $1;`, [id]
    );
    if (rows.length === 0) {
      return null;
    }
    return new Superhero(rows[0]);
  }

  static async insert({ name, secret_identity, universe }) {
    const { rows } = await pool.query(
      `INSERT INTO superheros (name, secret_identity, universe)
       VALUES ($1, $2, $3)
       RETURNING *;`, [name, secret_identity, universe]
    );
    return new Superhero(rows[0]);
  }

  static async updateById(id, newAttributes) {
    const superhero = await Superhero.getSuperheroById(id);
    if (!superhero) return null;

    const updatedSuperhero = { ...superhero, ...newAttributes };
    const { rows } = await pool.query(
      `UPDATE superheros
       SET name = $2, secret_identity = $3, universe = $4
       WHERE id = $1
       RETURNING *;`, [id, updatedSuperhero.name, updatedSuperhero.secret_identity, updatedSuperhero.universe]
    );
    return new Superhero(rows[0]);
  }
}

module.exports = Superhero;
