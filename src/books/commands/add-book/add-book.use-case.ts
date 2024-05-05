import { Book } from "../../book";
import { BookRepository } from "../../database/book.repository";
import { AddBookDTO } from "../../dtos/add-book.dto";
import { BookNotCreatedError } from "../../errors/book-not-created.error";

export class AddBookUseCase {
  constructor(private readonly bookRepository: BookRepository) {}

  async execute(addBookDto: AddBookDTO): Promise<Book> {
    const book = await this.bookRepository.create(addBookDto);

    if (!book) {
      throw new BookNotCreatedError(addBookDto);
    }

    return book;
  }
}
