const mysql = require('mysql2/promise');

const setupDatabase = async () => {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: '',
    });

    console.log('Connected to MySQL server');


    await connection.execute('CREATE DATABASE IF NOT EXISTS bookshelf_db');
    console.log('✅ Database "bookshelf_db" created or already exists');


    await connection.execute('USE bookshelf_db');
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
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        
        INDEX idx_name (name),
        INDEX idx_author (author),
        INDEX idx_reading (reading),
        INDEX idx_finished (finished),
        INDEX idx_inserted_at (insertedAt)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `;

    await connection.execute(createTableQuery);
    console.log('Table "books" created with indexes');

    const [existingBooks] = await connection.execute('SELECT COUNT(*) as count FROM books');
    
    if (existingBooks[0].count === 0) {
      console.log('Menambahkan sampel buku.');
      
      for (const book of sampleBooks) {
        const insertQuery = `
          INSERT INTO books (id, name, year, author, summary, publisher, pageCount, readPage, reading, finished)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        
        await connection.execute(insertQuery, [
          book.id, book.name, book.year, book.author, book.summary,
          book.publisher, book.pageCount, book.readPage, book.reading, book.finished
        ]);
      }
      
      console.log('Sampel buku berhasil ditambahkan.');
    } else {
      console.log('Sampel buku sudah ada, tidak perlu ditambahkan.');
    }

    await connection.end();
    
  } catch (error) {
    console.error('Gagal setting database:', error);

    
    process.exit(1);
  }
};

setupDatabase();