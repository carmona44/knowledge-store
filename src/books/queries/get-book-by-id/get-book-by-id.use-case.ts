import { Book } from "../../book";
import { BookRepository } from "../../database/book.repository";
import { BookNotFoundError } from "../../errors/book-not-found.error";

export class GetBookByIdUseCase {
  constructor(private readonly bookRepository: BookRepository) {}

  async execute(id: string): Promise<Book> {
    const book = await this.bookRepository.findById(id);

    if (!book) {
      throw new BookNotFoundError(id);
    }

    return book;
  }
}
