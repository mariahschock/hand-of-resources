const pool = require('../utils/pool');

class Instrument {
  id;
  instrument_name;
  category;
  difficulty;

  constructor(row) {
    this.id = row.id;
    this.instrument_name = row.instrument_name;
    this.category = row.category;
    this.difficulty = row.difficulty;
  }

  static async getAllInstruments() {
    const { rows } = await pool.query(
      'SELECT * FROM instruments;'
    );
    return rows.map((row) => new Instrument(row));
  }

  static async getInstrumentById(id) {
    const { rows } = await pool.query(
      `SELECT * FROM instruments
      WHERE id = $1;`, [id]
    );
    if (rows.length === 0) {
      return null;
    }
    return new Instrument(rows[0]);
  }

  static async insert({ instrument_name, category, difficulty }) {
    const { rows } = await pool.query(
      `INSERT INTO instruments (instrument_name, category, difficulty)
       VALUES ($1, $2, $3)
       RETURNING *;`, [instrument_name, category, difficulty]
    );
    return new Instrument(rows[0]);
  }
}

module.exports = Instrument;
