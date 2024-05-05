export class BookLoan {
  constructor(
    public readonly id: string,
    public readonly bookId: string,
    public readonly user: string,
    public readonly loanDate: Date,
    public readonly dueDate: Date,
    public readonly returnDate?: Date
  ) {}
}
