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
}

module.exports = Instrument;
