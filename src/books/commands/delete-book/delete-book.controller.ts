import { Request, Response } from "express";
import { Book } from "../../book";
import { BookNotDeletedError } from "../../errors/book-not-deleted.error";
import { DeleteBookUseCase } from "./delete-book.use-case";

export class DeleteBookController {
  constructor(private readonly deleteBookUseCase: DeleteBookUseCase) {}

  async run(req: Request, res: Response): Promise<Response<Book>> {
    const id = req.params.id;

    try {
      const book = await this.deleteBookUseCase.execute(id);
      return res.status(200).send(book);
    } catch (error) {
      if (error instanceof BookNotDeletedError) {
        return res.status(400).send();
      }
      return res.status(500).send(error);
    }
  }
}
