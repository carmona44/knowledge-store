import { Book } from "../../src/books/book";

export class BookMother {
  static createBook({
    id = "default-id",
    title = "default-title",
    author = "default-author",
    publicationYear = 2024,
    publisher = "default-publisher",
    reference = "default-reference",
    availableCopies = 4,
    totalCopies = 4,
  } = {}): Book {
    return {
      id,
      title,
      author,
      publicationYear,
      publisher,
      reference,
      availableCopies,
      totalCopies,
    };
  }

  static createBooks(count: number = 3): Book[] {
    const books: Book[] = [];
    for (let i = 1; i <= count; i++) {
      books.push(this.createBook());
    }
    return books;
  }
}
