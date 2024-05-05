export class BookNotUpdatedError extends Error {
  constructor(id: string) {
    super(`Book "${id}" not updated`);
  }
}
