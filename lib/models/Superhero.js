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
}

module.exports = Superhero;
