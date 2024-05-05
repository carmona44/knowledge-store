import { Book } from "../book";
import { AddBookDTO } from "../dtos/add-book.dto";
import { UpdateBookDTO } from "../dtos/update-book.dto";
import { BookFiltersDTO } from "../errors/book-filters.dto";

export interface BookRepository {
  create(addBookDto: AddBookDTO): Promise<Book | null>;
  findById(id: string): Promise<Book | null>;
  find(bookFilters: BookFiltersDTO): Promise<Book[]>;
  findByIdAndUpdate(
    id: string,
    updateBookDto: UpdateBookDTO
  ): Promise<Book | null>;
  findByIdAndDelete(id: string): Promise<Book | null>;
}
