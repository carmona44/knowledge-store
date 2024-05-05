import mongoose, { HydratedDocument } from "mongoose";

interface IBookLoan {
  book: mongoose.Schema.Types.ObjectId;
  user: string;
  loanDate: Date;
  dueDate: Date;
  returnDate?: Date;
}

const bookLoanSchema = new mongoose.Schema<IBookLoan>({
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
    required: true,
  },
  user: { type: String, required: true },
  loanDate: { type: Date, default: Date.now },
  dueDate: { type: Date, required: true },
  returnDate: { type: Date, required: false },
});

const BookLoanModel = mongoose.model<IBookLoan>("BookLoan", bookLoanSchema);

export default BookLoanModel;

export type BookLoanDoc = HydratedDocument<IBookLoan>;
