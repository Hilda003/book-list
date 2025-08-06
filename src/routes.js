import {
  addCategoryHandler,
  getAllCategoriesHandler,
  getCategoryByIdHandler,
  updateCategoryByIdHandler,
  deleteCategoryByIdHandler,
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  updateBookByIdHandler,
  deleteBookByIdHandler,
} from "./handler.js";

const routes = [
  {
    method: "GET",
    path: "/categories",
    handler: getAllCategoriesHandler,
  },
  {
    method: "GET",
    path: "/categories/{categoryId}",
    handler: getCategoryByIdHandler,
  },
  {
    method: "POST",
    path: "/categories",
    handler: addCategoryHandler,
  },
  {
    method: "PUT",
    path: "/categories/{categoryId}",
    handler: updateCategoryByIdHandler,
  },
  {
    method: "DELETE",
    path: "/categories/{categoryId}",
    handler: deleteCategoryByIdHandler,
  },

  {
    method: "GET",
    path: "/books",
    handler: getAllBooksHandler,
  },
  {
    method: "GET",
    path: "/books/{bookId}",
    handler: getBookByIdHandler,
  },
  {
    method: "POST",
    path: "/books",
    handler: addBookHandler,
  },
  {
    method: "PUT",
    path: "/books/{bookId}",
    handler: updateBookByIdHandler,
  },
  {
    method: "DELETE",
    path: "/books/{bookId}",
    handler: deleteBookByIdHandler,
  },
];

export default routes;