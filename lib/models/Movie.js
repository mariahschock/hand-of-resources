const pool = require('../utils/pool');

class Movie {
  id;
  title;
  director;
  year;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.director = row.director;
    this.year = row.year;
  }

  static async getAllMovies() {
    const { rows } = await pool.query(
      'SELECT * FROM movies;'
    );
    return rows.map((row) => new Movie(row));
  }
}

module.exports = Movie;
