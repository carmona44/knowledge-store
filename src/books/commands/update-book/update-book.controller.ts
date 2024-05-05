import { Request, Response } from "express";
import { Book } from "../../book";
import { UpdateBookDTO } from "../../dtos/update-book.dto";
import { BookNotUpdatedError } from "../../errors/book-not-updated.error";
import { UpdateBookUseCase } from "./update-book.use-case";

export class UpdateBookController {
  constructor(private readonly updateBookUseCase: UpdateBookUseCase) {}

  async run(
    req: Request,
    res: Response
  ): Promise<Response<Book> | Response<Error>> {
    const id = req.params.id;
    const { title, author, publicationYear, publisher } = req.body;

    try {
      const updateBookDto: UpdateBookDTO = {
        title,
        author,
        publicationYear,
        publisher,
      };
      const book = await this.updateBookUseCase.execute(id, updateBookDto);
      return res.status(201).send(book);
    } catch (error) {
      if (error instanceof BookNotUpdatedError) {
        return res.status(400).send(error);
      }
      return res.status(500).send(error);
    }
  }
}
