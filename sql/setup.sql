-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS instruments;
DROP TABLE IF EXISTS animals;
DROP TABLE IF EXISTS movies;

CREATE TABLE instruments (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    instrument_name VARCHAR NOT NULL,
    category VARCHAR NOT NULL,
    difficulty VARCHAR NOT NULL
);

CREATE TABLE animals (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    type VARCHAR NOT NULL,
    name VARCHAR NOT NULL,
    age INT NOT NULL
);

CREATE TABLE movies (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title VARCHAR NOT NULL,
    director VARCHAR NOT NULL,
    year INT
);

INSERT INTO instruments (
    instrument_name,
    category,
    difficulty
)
VALUES
  ('Trumpet', 'Brass', 'Medium'),
  ('Viola', 'String', 'Hard'),
  ('Oboe', 'Woodwind', 'Very hard'),
  ('Snare', 'Percussion', 'Easy');

INSERT INTO animals (
    type,
    name,
    age
)
VALUES
  ('cat', 'Leo', 5),
  ('cat', 'TK', 3),
  ('cat', 'Phoebe', 1),
  ('dog', 'Philly', 2);

  INSERT INTO movies (
    title,
    director,
    year
  )
VALUES
  ('Freaky Friday', 'Mark Waters', 2003),
  ('Wedding Crashers', 'David Dobkin', 2005),
  ('The Holiday', 'Nancy Meyers', 2006),
  ('School of Rock', 'Richard Linklater', 2003);