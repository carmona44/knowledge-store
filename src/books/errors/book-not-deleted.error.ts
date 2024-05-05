export class BookNotDeletedError extends Error {
  constructor(id: string) {
    super(`Book "${id}" not deleted`);
  }
}
