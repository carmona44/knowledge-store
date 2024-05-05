export class BookAlreadyBorrowedError extends Error {
  constructor(userId: string, bookId: string) {
    super(`User "${userId}" has already borrowed the book "${bookId}"`);
  }
}
