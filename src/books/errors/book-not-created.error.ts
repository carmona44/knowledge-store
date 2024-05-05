import { AddBookDTO } from "../dtos/add-book.dto";

export class BookNotCreatedError extends Error {
  constructor(addBookDto: AddBookDTO) {
    super(`Unable to create the book "${addBookDto?.title}"`);
  }
}
