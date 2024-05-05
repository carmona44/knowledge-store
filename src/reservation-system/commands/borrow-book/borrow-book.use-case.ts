import { GetBookByIdUseCase } from "../../../books/queries/get-book-by-id/get-book-by-id.use-case";
import eventManager from "../../../shared/event-manager/event-manager";
import { reservationEvents } from "../../../shared/event-manager/events/reservation-events";
import { BookLoan } from "../../book-loan";
import { BookLoanRepository } from "../../database/book-loan.repository";
import { BookLoanFiltersDTO } from "../../dtos/book-loan-filters.dto";
import { BorrowBookDTO } from "../../dtos/borrow-book.dto";
import { CreateBookLoanDTO } from "../../dtos/create-book-loan.dto";
import { BookAlreadyBorrowedError } from "../../errors/book-already-borrowed.error";
import { BookLoanNotCreated } from "../../errors/book-loan-not-created.error";
import { MaxLoansReachedError } from "../../errors/max-loans-reached.error";
import { NotAvailableCopiesError } from "../../errors/not-available-copies.error";
import { calculateDueDate } from "../../helpers/calculate-due-date.helper";

export class BorrowBookUseCase {
  constructor(
    private readonly bookLoanRepository: BookLoanRepository,
    private readonly getBookByIdUseCase: GetBookByIdUseCase
  ) {}

  async execute(borrowBookDto: BorrowBookDTO): Promise<BookLoan> {
    const { bookId, user } = borrowBookDto;

    await this.checkBorrowRequirements(borrowBookDto);

    const createBookLoanDto: CreateBookLoanDTO = {
      book: bookId,
      user,
      dueDate: calculateDueDate(),
    };
    const newLoan = await this.bookLoanRepository.create(createBookLoanDto);
    if (!newLoan) {
      throw new BookLoanNotCreated();
    }

    this.broadcastSideEffects(borrowBookDto);

    return newLoan;
  }

  private async checkBorrowRequirements(
    borrowBookDto: BorrowBookDTO
  ): Promise<void> {
    const { bookId, user } = borrowBookDto;
    const book = await this.getBookByIdUseCase.execute(bookId);

    if (book.availableCopies < 1) {
      throw new NotAvailableCopiesError(bookId);
    }

    const bookLoanFiltersDto: BookLoanFiltersDTO = {
      user,
      limit: 4,
      status: "borrowed",
    };
    const userLoans = await this.bookLoanRepository.find(bookLoanFiltersDto);
    if (userLoans.length >= 3) {
      throw new MaxLoansReachedError(user);
    }

    const alreadyBorrowed = userLoans.some(
      (loan) => loan.bookId.toString() === bookId
    );
    if (alreadyBorrowed) {
      throw new BookAlreadyBorrowedError(user, bookId);
    }
  }

  private broadcastSideEffects(borrowBookDto: BorrowBookDTO): void {
    const { bookId } = borrowBookDto;
    eventManager.emit(reservationEvents.bookBorrowed, bookId);
  }
}
