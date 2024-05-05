import eventManager from "../../shared/event-manager/event-manager";
import { reservationEvents } from "../../shared/event-manager/events/reservation-events";
import { BookRepository } from "../database/book.repository";
import { UpdateBookDTO } from "../dtos/update-book.dto";

export class OnBookBorrowedEventHandler {
  constructor(private readonly bookRepository: BookRepository) {
    this.handle = this.handle.bind(this);
    eventManager.on(reservationEvents.bookBorrowed, this.handle);
  }

  private async handle(bookId: string) {
    const updateBookDto: UpdateBookDTO = {
      operation: "borrow",
    };
    await this.bookRepository.findByIdAndUpdate(bookId, updateBookDto);
  }
}
