export class BookNotFoundError extends Error {
  constructor(id: string) {
    super(`Book "${id}" not found`);
  }
}
