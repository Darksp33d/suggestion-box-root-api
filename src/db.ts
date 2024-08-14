import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

//function to open the database
export async function openDb() {
  return open({
    filename: './database.sqlite',
    driver: sqlite3.Database
  });
}

//function to setup the database with tables and relationships for suggestions and comments
//there is a table for suggestions and a table for comments
//there is a one-to-many relationship between suggestions and comments
//the function will check if the tables exist and create them if they don't, and then return the database object
export async function setupDb() {
  const db = await openDb();
  await db.exec(`
    CREATE TABLE IF NOT EXISTS suggestions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      author TEXT NOT NULL,
      createdAt TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS comments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      suggestionId INTEGER NOT NULL,
      content TEXT NOT NULL,
      author TEXT NOT NULL,
      createdAt TEXT NOT NULL,
      FOREIGN KEY (suggestionId) REFERENCES suggestions (id)
    );`);
  return db;
}