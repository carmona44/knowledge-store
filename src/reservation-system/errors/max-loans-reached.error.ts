export class MaxLoansReachedError extends Error {
  constructor(id: string) {
    super(`User "${id}" can't borrow more than 3 books at a time`);
  }
}
