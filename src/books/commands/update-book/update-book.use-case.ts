import { Book } from "../../book";
import { BookRepository } from "../../database/book.repository";
import { UpdateBookDTO } from "../../dtos/update-book.dto";
import { BookNotUpdatedError } from "../../errors/book-not-updated.error";

export class UpdateBookUseCase {
  constructor(private readonly bookRepository: BookRepository) {}

  async execute(id: string, updateBookDto: UpdateBookDTO): Promise<Book> {
    const book = await this.bookRepository.findByIdAndUpdate(id, updateBookDto);

    if (!book) {
      throw new BookNotUpdatedError(id);
    }

    return book;
  }
}
