import { Book } from "../../book";
import { BookRepository } from "../../database/book.repository";
import { BookFiltersDTO } from "../../errors/book-filters.dto";

export class GetBooksUseCase {
  constructor(private readonly bookRepository: BookRepository) {}

  async execute(bookFiltersDTO: BookFiltersDTO): Promise<Book[]> {
    const books = await this.bookRepository.find(bookFiltersDTO);
    return books;
  }
}
