import { BookLoan } from "../../book-loan";
import { BookLoanDoc } from "./book-loan.schema";

export const mapBookLoanDocToEntity = (bookLoanDoc: BookLoanDoc): BookLoan => {
  const { _id, book, user, loanDate, dueDate, returnDate } = bookLoanDoc;
  return new BookLoan(
    _id.toString(),
    book.toString(),
    user,
    loanDate,
    dueDate,
    returnDate
  );
};
