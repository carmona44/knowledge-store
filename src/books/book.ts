export class Book {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly author: string,
    public readonly publicationYear: number,
    public readonly publisher: string,
    public readonly reference: string,
    public readonly totalCopies: number,
    public readonly availableCopies: number
  ) {}
}
