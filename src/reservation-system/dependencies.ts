import { getBookByIdUseCase } from "../books/dependencies";
import { BorrowBookController } from "./commands/borrow-book/borrow-book.controller";
import { BorrowBookUseCase } from "./commands/borrow-book/borrow-book.use-case";
import { ReturnBookController } from "./commands/return-book/return-book.controller";
import { ReturnBookUseCase } from "./commands/return-book/return-book.use-case";
import { handleReminders } from "./cron-jobs/reminders.cron-job";
import { BookLoanRepository } from "./database/book-loan.repository";
import { MongoBookLoanRepository } from "./database/mongo/mongo-book-loan.repository";

const getBookLoanRepository = (): BookLoanRepository =>
  new MongoBookLoanRepository();

const borrowBookUseCase = new BorrowBookUseCase(
  getBookLoanRepository(),
  getBookByIdUseCase
);
export const borrowBookController = new BorrowBookController(borrowBookUseCase);

const returnBookUseCase = new ReturnBookUseCase(getBookLoanRepository());
export const returnBookController = new ReturnBookController(returnBookUseCase);

console.log("[server]: Initializing reminders jobs");
handleReminders.start();
