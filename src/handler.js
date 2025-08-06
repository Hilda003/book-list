import { nanoid } from "nanoid";
import { db } from "./database.js";

export const addCategoryHandler = async (request, h) => {
  try {
    const { name, description } = request.payload;

    if (!name) {
      return h
        .response({
          status: "fail",
          message: "Gagal menambahkan kategori. Mohon isi nama kategori",
        })
        .code(400);
    }

    const id = nanoid(16);
    const categoryData = {
      id,
      name,
      description: description || '',
    };

    await db.addCategory(categoryData);

    return h
      .response({
        status: "success",
        message: "Kategori berhasil ditambahkan",
        data: {
          categoryId: id,
        },
      })
      .code(201);
      
  } catch (error) {
    console.error('Gagal menambahkan kategori:', error);
    
    if (error.code === 'ER_DUP_ENTRY') {
      return h
        .response({
          status: "fail",
          message: "Kategori dengan nama tersebut sudah ada",
        })
        .code(400);
    }
    
    return h
      .response({
        status: "error",
        message: "Terjadi kesalahan pada server",
      })
      .code(500);
  }
};

export const getStatsHandler = async (request, h) => {
  try {
    const stats = await db.getBookStats();
    
    return h
      .response({
        status: "success",
        data: {
          stats,
        },
      })
      .code(200);
      
  } catch (error) {
    console.error('Gagal mendapatkan statistik:', error);
    return h
      .response({
        status: "error",
        message: "Terjadi kesalahan pada server",
      })
      .code(500);
  }
};
      })
      .code(500);
  }
};

export const getAllCategoriesHandler = async (request, h) => {
  try {
    const categories = await db.getAllCategories();
    
    return h
      .response({
        status: "success",
        data: {
          categories,
        },
      })
      .code(200);
      
  } catch (error) {
    console.error('Gagal mendapatkan kategori:', error);
    return h
      .response({
        status: "error",
        message: "Terjadi kesalahan pada server",
      })
      .code(500);
  }
};

export const getCategoryByIdHandler = async (request, h) => {
  try {
    const { categoryId } = request.params;

    const category = await db.getCategoryById(categoryId);

    if (!category) {
      return h
        .response({
          status: "fail",
          message: "Kategori tidak ditemukan",
        })
        .code(404);
    }

    return h
      .response({
        status: "success",
        data: {
          category,
        },
      })
      .code(200);
      
  } catch (error) {
    console.error('Gagal mendapatkan kategori berdasarkan ID:', error);
    return h
      .response({
        status: "error",
        message: "Terjadi kesalahan pada server",
      })
      .code(500);
  }
};

export const updateCategoryByIdHandler = async (request, h) => {
  try {
    const { categoryId } = request.params;
    const { name, description } = request.payload;

    const categoryExists = await db.categoryExists(categoryId);

    if (!categoryExists) {
      return h
        .response({
          status: "fail",
          message: "Gagal memperbarui kategori. Id tidak ditemukan",
        })
        .code(404);
    }

    if (!name) {
      return h
        .response({
          status: "fail",
          message: "Gagal memperbarui kategori. Mohon isi nama kategori",
        })
        .code(400);
    }

    const categoryData = {
      name,
      description: description || '',
    };

    const updated = await db.updateCategory(categoryId, categoryData);
    
    if (!updated) {
      return h
        .response({
          status: "fail",
          message: "Gagal memperbarui kategori",
        })
        .code(500);
    }

    return h
      .response({
        status: "success",
        message: "Kategori berhasil diperbarui",
      })
      .code(200);
      
  } catch (error) {
    console.error('Gagal memperbarui kategori:', error);
    
    if (error.code === 'ER_DUP_ENTRY') {
      return h
        .response({
          status: "fail",
          message: "Kategori dengan nama tersebut sudah ada",
        })
        .code(400);
    }
    
    return h
      .response({
        status: "error",
        message: "Terjadi kesalahan pada server",
      })
      .code(500);
  }
};

export const deleteCategoryByIdHandler = async (request, h) => {
  try {
    const { categoryId } = request.params;

    const categoryExists = await db.categoryExists(categoryId);

    if (!categoryExists) {
      return h
        .response({
          status: "fail",
          message: "Kategori gagal dihapus. Id tidak ditemukan",
        })
        .code(404);
    }

    const deleted = await db.deleteCategory(categoryId);
    
    if (!deleted) {
      return h
        .response({
          status: "fail",
          message: "Kategori gagal dihapus",
        })
        .code(500);
    }

    return h
      .response({
        status: "success",
        message: "Kategori berhasil dihapus",
      })
      .code(200);
      
  } catch (error) {
    console.error('Error deleting category:', error);
    
    if (error.message.includes('Cannot delete category')) {
      return h
        .response({
          status: "fail",
          message: "Tidak dapat menghapus kategori yang masih memiliki buku",
        })
        .code(400);
    }
    
    return h
      .response({
        status: "error",
        message: "Terjadi kesalahan pada server",
      })
      .code(500);
  }
};

// Book handlers (updated)
export const addBookHandler = async (request, h) => {
  try {
     const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    categoryId,
  } = request.payload;

  if (!name) {
    return h
      .response({
        status: "fail",
        message: "Gagal menambahkan buku. Mohon isi nama buku",
      })
      .code(400);
  }

  if (readPage > pageCount) {
    return h
      .response({
        status: "fail",
        message:
          "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
      })
      .code(400);
  }
    if (categoryId) {
      const categoryExists = await db.categoryExists(categoryId);
      if (!categoryExists) {
        return h
          .response({
            status: "fail",
            message: "Gagal menambahkan buku. Kategori tidak ditemukan",
          })
          .code(400);
      }
  }

  const id = nanoid(16);
  const finished = pageCount === readPage;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const bookData = {
      id,
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
    finished,
    insertedAt,
    updatedAt,
      reading: reading || false,
      categoryId: categoryId || null,
    };

    await db.addBook(bookData);

  return h
    .response({
      status: "success",
      message: "Buku berhasil ditambahkan",
      data: {
        bookId: id,
      },
    })
    .code(201);
      
  } catch (error) {
    console.error('Gagal menambahkan buku', error);
    return h
    .response({
      status: "error",
      message: "Terjadi kesalahan pada server",
    })
    .code(500);
  }
 
};

export const getAllBooksHandler = async (request, h) => {
  try {
    const { name, reading, finished, categoryId, year } = request.query;

    const filters = {};
    
  if (name) {
     filters.name = name;
    }
    
  if (reading !== undefined) {
      filters.reading = reading === "1";
    }
    
  if (finished !== undefined) {
      filters.finished = finished === "1";
    }
    
    if (categoryId) {
      filters.categoryId = categoryId;
    }
    
    if (year) {
      filters.year = parseInt(year);
    }

    const books = await db.getAllBooks(filters);
    
  
  const responseBooks = books.map(book => ({
      id: book.id,
      name: book.name,
      year: book.year,
      author: book.author,
      summary: book.summary,
      publisher: book.publisher,
      pageCount: book.pageCount,
      readPage: book.readPage,
      reading: Boolean(book.reading),
      finished: Boolean(book.finished),
      categoryId: book.categoryId,
      categoryName: book.categoryName,
      insertedAt: book.insertedAt,
      updatedAt: book.updatedAt,
    }));

  return h
    .response({
      status: "success",
      data: {
        books: responseBooks,
      },
    })
    .code(200);
      
  } catch (error) {
    console.error('Gagal mendapatkan buku:', error);
    return h
      .response({
        status: "error",
        message: "Terjadi kesalahan pada server",
      })
      .code(500);
  }
};

export const getBookByIdHandler = async (request, h) => {
  try {
      const { bookId } = request.params;

  const book = await db.getBookById(bookId);

  if (!book) {
    return h
      .response({
        status: "fail",
        message: "Buku tidak ditemukan",
      })
      .code(404);
  }
  const responseBook = {
      id: book.id,
      name: book.name,
      year: book.year,
      author: book.author,
      summary: book.summary,
      publisher: book.publisher,
      pageCount: book.pageCount,
      readPage: book.readPage,
      reading: Boolean(book.reading),
      finished: Boolean(book.finished),
      categoryId: book.categoryId,
      categoryName: book.categoryName,
      insertedAt: book.insertedAt,
      updatedAt: book.updatedAt,
    };

  return h
      .response({
    status: "success",
    data: {
      book: responseBook,
    },
      })
      .code(200);
      
  } catch (error) {
    console.error('Gagal mendapatkan buku berdasarkan ID:', error);
    return h
      .response({
        status: "error",
        message: "Terjadi kesalahan pada server",
      })
      .code(500);
  }

};

export const updateBookByIdHandler = async (request, h) => {
  try {
      const { bookId } = request.params;
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    categoryId,
  } = request.payload;

  const bookExists = await db.bookExists(bookId);

  if (!bookExists) {
    return h
      .response({
        status: "fail",
        message: "Gagal memperbarui buku. Id tidak ditemukan",
      })
      .code(404);
  }

  if (!name) {
    return h
      .response({
        status: "fail",
        message: "Gagal memperbarui buku. Mohon isi nama buku",
      })
      .code(400);
  }

  if (readPage > pageCount) {
    return h
      .response({
        status: "fail",
        message:
          "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
      })
      .code(400);
  }
    if (categoryId) {
      const categoryExists = await db.categoryExists(categoryId);
      if (!categoryExists) {
        return h
          .response({
            status: "fail",
            message: "Gagal memperbarui buku. Kategori tidak ditemukan",
          })
          .code(400);
      }
    }

  const bookData = {
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading: reading || false,
      categoryId: categoryId || null,
    };

    const updated = await db.updateBook(bookId, bookData);
    
    if (!updated) {
      return h
        .response({
          status: "fail",
          message: "Gagal memperbarui buku",
        })
        .code(500);
    }

    return h
      .response({
        status: "success",
        message: "Buku berhasil diperbarui",
      })
      .code(200);
  } catch (error) {
    console.error('Gagal memperbarui buku:', error);
    return h
      .response({
        status: "error",
        message: "Terjadi kesalahan pada server",
      })
      .code(500);
  }


};

export const deleteBookByIdHandler = async (request, h) => {
  try {
    const { bookId } = request.params;

   const bookExists = await db.bookExists(bookId);

  if (!bookExists) {
    return h
      .response({
        status: "fail",
        message: "Buku gagal dihapus. Id tidak ditemukan",
      })
      .code(404);
  }

   const deleted = await db.deleteBook(bookId);
    
    if (!deleted) {
      return h
        .response({
          status: "fail",
          message: "Buku gagal dihapus",
        })
        .code(500);
    }

  return h
    .response({
      status: "success",
      message: "Buku berhasil dihapus",
    })
    .code(200);
  } catch (error) {
    console.error('Error deleting book:', error);
    return h
      .response({
        status: "error",
        message: "Terjadi kesalahan pada server",
      })
      .code(500);
  }

};