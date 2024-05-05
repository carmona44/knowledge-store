export class NotAvailableCopiesError extends Error {
  constructor(id: string) {
    super(`No copies available for book "${id}"`);
  }
}
