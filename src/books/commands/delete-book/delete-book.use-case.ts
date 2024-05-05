import { Book } from "../../book";
import { BookRepository } from "../../database/book.repository";
import { BookNotDeletedError } from "../../errors/book-not-deleted.error";

export class DeleteBookUseCase {
  constructor(private readonly bookRepository: BookRepository) {}

  async execute(id: string): Promise<Book> {
    const book = await this.bookRepository.findByIdAndDelete(id);

    if (!book) {
      throw new BookNotDeletedError(id);
    }

    return book;
  }
}
