import eventManager from "../../../shared/event-manager/event-manager";
import { pointsEvents } from "../../../shared/event-manager/events/points-events";
import { reservationEvents } from "../../../shared/event-manager/events/reservation-events";
import { BookLoan } from "../../book-loan";
import { BookLoanRepository } from "../../database/book-loan.repository";
import { UpdateBookLoanDTO } from "../../dtos/update-book-loan.dto";
import { BookLoanAlreadyReturnedError } from "../../errors/book-loan-already-returned.error";
import { BookLoanNotReturnedError } from "../../errors/book-loan-not-returned.error";
import { checkIsOnTime } from "../../helpers/check-is-on-time.helper";

export class ReturnBookUseCase {
  constructor(private readonly bookLoanRepository: BookLoanRepository) {}

  async execute(bookLoanId: string): Promise<BookLoan> {
    const updateBookLoanDTO: UpdateBookLoanDTO = { returnDate: new Date() };
    const returnedBookLoan = await this.bookLoanRepository.findByIdAndUpdate(
      bookLoanId,
      updateBookLoanDTO
    );

    if (returnedBookLoan?.returnDate) {
      throw new BookLoanAlreadyReturnedError(bookLoanId);
    }

    if (!returnedBookLoan) {
      throw new BookLoanNotReturnedError(bookLoanId);
    }

    this.broadcastSideEffects(returnedBookLoan);

    return returnedBookLoan;
  }

  private broadcastSideEffects(bookLoan: BookLoan): void {
    const { bookId, dueDate } = bookLoan;
    eventManager.emit(reservationEvents.bookReturned, bookId);

    const isOnTime: boolean = checkIsOnTime(dueDate);
    if (isOnTime) {
      eventManager.emit(pointsEvents.add, bookLoan.user);
    }
  }
}
