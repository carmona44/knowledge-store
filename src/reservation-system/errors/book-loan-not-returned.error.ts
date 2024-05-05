export class BookLoanNotReturnedError extends Error {
  constructor(bookLoanId: string) {
    super(`Something went wrong returning the book "${bookLoanId}"`);
  }
}
