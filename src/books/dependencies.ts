import { AddBookController } from "./commands/add-book/add-book.controller";
import { AddBookUseCase } from "./commands/add-book/add-book.use-case";
import { DeleteBookController } from "./commands/delete-book/delete-book.controller";
import { DeleteBookUseCase } from "./commands/delete-book/delete-book.use-case";
import { UpdateBookController } from "./commands/update-book/update-book.controller";
import { UpdateBookUseCase } from "./commands/update-book/update-book.use-case";
import { BookRepository } from "./database/book.repository";
import { MongoBookRepository } from "./database/mongo/mongo-book.repository";
import { OnBookBorrowedEventHandler } from "./event-handlers/on-book-borrowed.event-handler";
import { OnBookReturnedEventHandler } from "./event-handlers/on-book-returned.event-handler";
import { GetBookByIdController } from "./queries/get-book-by-id/get-book-by-id.controller";
import { GetBookByIdUseCase } from "./queries/get-book-by-id/get-book-by-id.use-case";
import { GetBooksController } from "./queries/get-books/get-books.controller";
import { GetBooksUseCase } from "./queries/get-books/get-books.use-case";

// Instantiate Database
const getBookRepository = (): BookRepository => new MongoBookRepository();
const bookRepositorySingleton = getBookRepository();

// Instantiate Use Cases
const addBookUseCase = new AddBookUseCase(bookRepositorySingleton);
const deleteBookUseCase = new DeleteBookUseCase(bookRepositorySingleton);
const updateBookUseCase = new UpdateBookUseCase(bookRepositorySingleton);
export const getBookByIdUseCase = new GetBookByIdUseCase(
  bookRepositorySingleton
);
const getBooksUseCase = new GetBooksUseCase(bookRepositorySingleton);

// Instantiate Controllers
export const addBookController = new AddBookController(addBookUseCase);
export const deleteBookController = new DeleteBookController(deleteBookUseCase);
export const updateBookController = new UpdateBookController(updateBookUseCase);
export const getBookByIdController = new GetBookByIdController(
  getBookByIdUseCase
);
export const getBooksController = new GetBooksController(getBooksUseCase);

// Instantiate Event Handlers
new OnBookBorrowedEventHandler(bookRepositorySingleton);
new OnBookReturnedEventHandler(bookRepositorySingleton);
