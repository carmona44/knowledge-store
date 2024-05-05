import { Request, Response } from "express";
import { BookLoan } from "../../book-loan";
import { BookLoanAlreadyReturnedError } from "../../errors/book-loan-already-returned.error";
import { BookLoanNotReturnedError } from "../../errors/book-loan-not-returned.error";
import { ReturnBookUseCase } from "./return-book.use-case";

export class ReturnBookController {
  constructor(private readonly returnBookUseCase: ReturnBookUseCase) {}

  async run(
    req: Request,
    res: Response
  ): Promise<Response<BookLoan> | Response<Error>> {
    const bookLoanId = req.params.id;

    try {
      const loan = await this.returnBookUseCase.execute(bookLoanId);
      return res.status(200).send(loan);
    } catch (error) {
      if (
        error instanceof BookLoanNotReturnedError ||
        error instanceof BookLoanAlreadyReturnedError
      ) {
        return res.status(400).send();
      }
      return res.status(500).send(error);
    }
  }
}
