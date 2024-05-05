import { Request, Response } from "express";
import { BookLoan } from "../../book-loan";
import { BorrowBookDTO } from "../../dtos/borrow-book.dto";
import { BorrowBookUseCase } from "./borrow-book.use-case";

export class BorrowBookController {
  constructor(private readonly borrowBookUseCase: BorrowBookUseCase) {}

  async run(
    req: Request,
    res: Response
  ): Promise<Response<BookLoan> | Response<Error>> {
    const { user, bookId } = req.body;

    try {
      const borrowBookDto: BorrowBookDTO = {
        user,
        bookId,
      };
      const newLoan = await this.borrowBookUseCase.execute(borrowBookDto);
      return res.status(201).send(newLoan);
    } catch (error) {
      return res.status(400).send(error);
    }
  }
}
