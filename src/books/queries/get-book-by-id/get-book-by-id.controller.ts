import { Request, Response } from "express";
import { Book } from "../../book";
import { BookNotFoundError } from "../../errors/book-not-found.error";
import { GetBookByIdUseCase } from "./get-book-by-id.use-case";

export class GetBookByIdController {
  constructor(private readonly getBookByIdUseCase: GetBookByIdUseCase) {}

  async run(
    req: Request,
    res: Response
  ): Promise<Response<Book> | Response<Error>> {
    const id = req.params.id;

    try {
      const book = await this.getBookByIdUseCase.execute(id);
      return res.status(200).send(book);
    } catch (error) {
      if (error instanceof BookNotFoundError) {
        return res.status(404).send(error);
      }

      return res.status(500).send(error);
    }
  }
}
