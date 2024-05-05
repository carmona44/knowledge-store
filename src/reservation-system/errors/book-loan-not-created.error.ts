export class BookLoanNotCreated extends Error {
  constructor() {
    super("Something went wrong creating book loan");
  }
}
