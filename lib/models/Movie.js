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

  static async getMovieById(id) {
    const { rows } = await pool.query(
      `SELECT * FROM movies
       WHERE id = $1;`, [id]
    );
    if (rows.length === 0) {
      return null;
    }
    return new Movie(rows[0]);
  }

  static async insert({ title, director, year }) {
    const { rows } = await pool.query(
      `INSERT INTO movies (title, director, year)
       VALUES ($1, $2, $3)
       RETURNING *;`, [title, director, year]
    );
    return new Movie(rows[0]);
  }

  static async updateById(id, newAttributes) {
    const movie = await Movie.getMovieById(id);
    if (!movie) return null;

    const updatedMovie = { ...movie, ...newAttributes };
    const { rows } = await pool.query(
      `UPDATE movies
       SET title = $2, director = $3, year = $4
       WHERE id = $1
       RETURNING *;`, [id, updatedMovie.title, updatedMovie.director, updatedMovie.year]
    );
    return new Movie(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      `DELETE from movies
       WHERE id = $1
       RETURNING *;`, [id]
    );
    return new Movie(rows[0]);
  }
}

module.exports = Movie;
