export class BookLoanAlreadyReturnedError extends Error {
  constructor(bookLoanId: string) {
    super(`Book loan "${bookLoanId}" already returned`);
  }
}
