import mysql from 'mysql2/promise';

const dbConfig = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'bookshelf_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

const pool = mysql.createPool(dbConfig);

export const initDatabase = async () => {
  try {
    const connection = await pool.getConnection();
    await connection.query(`CREATE DATABASE IF NOT EXISTS bookshelf_db`);
    await connection.query(`USE bookshelf_db`);
    
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS books (
        id VARCHAR(16) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        year INT NOT NULL,
        author VARCHAR(255) NOT NULL,
        summary TEXT NOT NULL,
        publisher VARCHAR(255) NOT NULL,
        pageCount INT NOT NULL,
        readPage INT NOT NULL DEFAULT 0,
        reading BOOLEAN NOT NULL DEFAULT FALSE,
        finished BOOLEAN NOT NULL DEFAULT FALSE,
        insertedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `;
    
    await connection.query(createTableQuery);
    console.log('Database and table initialized successfully');
    
    connection.release();
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
};

export const db = {
  async getAllBooks(filters = {}) {
    let query = 'SELECT * FROM books WHERE 1=1';
    const params = [];
    
    if (filters.name) {
      query += ' AND name LIKE ?';
      params.push(`%${filters.name}%`);
    }
    
    if (filters.reading !== undefined) {
      query += ' AND reading = ?';
      params.push(filters.reading);
    }
    
    if (filters.finished !== undefined) {
      query += ' AND finished = ?';
      params.push(filters.finished);
    }
    
    query += ' ORDER BY insertedAt DESC';
    
    const [rows] = await pool.execute(query, params);
    return rows;
  },

  async getBookById(id) {
    const [rows] = await pool.execute('SELECT * FROM books WHERE id = ?', [id]);
    return rows[0];
  },

  async addBook(bookData) {
    const { id, name, year, author, summary, publisher, pageCount, readPage, reading } = bookData;
    const finished = pageCount === readPage;
    
    const query = `
      INSERT INTO books (id, name, year, author, summary, publisher, pageCount, readPage, reading, finished)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    const params = [id, name, year, author, summary, publisher, pageCount, readPage, reading, finished];
    
    await pool.execute(query, params);
    return this.getBookById(id);
  },
  async updateBook(id, bookData) {
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = bookData;
    const finished = pageCount === readPage;
    
    const query = `
      UPDATE books 
      SET name = ?, year = ?, author = ?, summary = ?, publisher = ?, 
          pageCount = ?, readPage = ?, reading = ?, finished = ?, updatedAt = CURRENT_TIMESTAMP
      WHERE id = ?
    `;
    
    const params = [name, year, author, summary, publisher, pageCount, readPage, reading, finished, id];
    
    const [result] = await pool.execute(query, params);
    return result.affectedRows > 0;
  },

  async deleteBook(id) {
    const [result] = await pool.execute('DELETE FROM books WHERE id = ?', [id]);
    return result.affectedRows > 0;
  },

  async bookExists(id) {
    const [rows] = await pool.execute('SELECT COUNT(*) as count FROM books WHERE id = ?', [id]);
    return rows[0].count > 0;
  }
};

export { pool };