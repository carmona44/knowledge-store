import { BookRepository } from "../../src/books/database/book.repository";

export const mockBookRepository: jest.Mocked<BookRepository> = {
  create: jest.fn(),
  findById: jest.fn(),
  find: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
};
