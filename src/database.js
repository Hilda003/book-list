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
    
    const createCategoriesTableQuery = `
      CREATE TABLE IF NOT EXISTS categories (
        id VARCHAR(16) PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE,
        description TEXT,
        insertedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `;
    
    await connection.query(createCategoriesTableQuery);

    const createBooksTableQuery = `
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
        categoryId VARCHAR(16),
        insertedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        
        FOREIGN KEY (categoryId) REFERENCES categories(id) ON DELETE SET NULL
      )
    `;
    
    await connection.query(createBooksTableQuery);
    console.log('Database and tables initialized successfully');
    
    connection.release();
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
};

export const db = {
  async getAllCategories() {
    const [rows] = await pool.execute('SELECT * FROM categories ORDER BY name ASC');
    return rows;
  },

  async getCategoryById(id) {
    const [rows] = await pool.execute('SELECT * FROM categories WHERE id = ?', [id]);
    return rows[0];
  },

  async addCategory(categoryData) {
    const { id, name, description } = categoryData;
    
    const query = `
      INSERT INTO categories (id, name, description)
      VALUES (?, ?, ?)
    `;
    
    const params = [id, name, description || ''];
    
    await pool.execute(query, params);
    return this.getCategoryById(id);
  },

  async updateCategory(id, categoryData) {
    const { name, description } = categoryData;
    
    const query = `
      UPDATE categories 
      SET name = ?, description = ?, updatedAt = CURRENT_TIMESTAMP
      WHERE id = ?
    `;
    
    const params = [name, description || '', id];
    
    const [result] = await pool.execute(query, params);
    return result.affectedRows > 0;
  },

  async deleteCategory(id) {
    // Check if category has books
    const [bookCount] = await pool.execute('SELECT COUNT(*) as count FROM books WHERE categoryId = ?', [id]);
    
    if (bookCount[0].count > 0) {
      throw new Error('Cannot delete category that has books assigned to it');
    }
    
    const [result] = await pool.execute('DELETE FROM categories WHERE id = ?', [id]);
    return result.affectedRows > 0;
  },

  async categoryExists(id) {
    const [rows] = await pool.execute('SELECT COUNT(*) as count FROM categories WHERE id = ?', [id]);
    return rows[0].count > 0;
  },

  async getAllBooks(filters = {}) {
    let query = `
      SELECT b.*, c.name as categoryName 
      FROM books b 
      LEFT JOIN categories c ON b.categoryId = c.id 
      WHERE 1=1
    `;
    const params = [];
    
    if (filters.name) {
      query += ' AND (b.name LIKE ? OR b.author LIKE ? OR b.publisher LIKE ?)';
      const searchTerm = `%${filters.name}%`;
      params.push(searchTerm, searchTerm, searchTerm);
    }
    
    if (filters.reading !== undefined) {
      query += ' AND b.reading = ?';
      params.push(filters.reading);
    }
    
    if (filters.finished !== undefined) {
      query += ' AND b.finished = ?';
      params.push(filters.finished);
    }
    
    if (filters.categoryId) {
      query += ' AND b.categoryId = ?';
      params.push(filters.categoryId);
    }
    
    if (filters.year) {
      query += ' AND b.year = ?';
      params.push(filters.year);
    }
    
    query += ' ORDER BY b.insertedAt DESC';
    
    const [rows] = await pool.execute(query, params);
    return rows;
  },

  async getBookById(id) {
    const query = `
      SELECT b.*, c.name as categoryName 
      FROM books b 
      LEFT JOIN categories c ON b.categoryId = c.id 
      WHERE b.id = ?
    `;
    const [rows] = await pool.execute(query, [id]);
    return rows[0];
  },

  async addBook(bookData) {
    const { id, name, year, author, summary, publisher, pageCount, readPage, reading, categoryId } = bookData;
    const finished = pageCount === readPage;
    
    const query = `
      INSERT INTO books (id, name, year, author, summary, publisher, pageCount, readPage, reading, finished, categoryId)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    const params = [id, name, year, author, summary, publisher, pageCount, readPage, reading, finished, categoryId || null];
    
    await pool.execute(query, params);
    return this.getBookById(id);
  },

  async updateBook(id, bookData) {
    const { name, year, author, summary, publisher, pageCount, readPage, reading, categoryId } = bookData;
    const finished = pageCount === readPage;
    
    const query = `
      UPDATE books 
      SET name = ?, year = ?, author = ?, summary = ?, publisher = ?, 
          pageCount = ?, readPage = ?, reading = ?, finished = ?, categoryId = ?, updatedAt = CURRENT_TIMESTAMP
      WHERE id = ?
    `;
    
    const params = [name, year, author, summary, publisher, pageCount, readPage, reading, finished, categoryId || null, id];
    
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
  },
  async getBookStats() {
    const [totalBooks] = await pool.execute('SELECT COUNT(*) as count FROM books');
    const [readingBooks] = await pool.execute('SELECT COUNT(*) as count FROM books WHERE reading = true');
    const [finishedBooks] = await pool.execute('SELECT COUNT(*) as count FROM books WHERE finished = true');
    const [totalCategories] = await pool.execute('SELECT COUNT(*) as count FROM categories');
    
    return {
      totalBooks: totalBooks[0].count,
      readingBooks: readingBooks[0].count,
      finishedBooks: finishedBooks[0].count,
      totalCategories: totalCategories[0].count
    };
  }
};

export { pool };