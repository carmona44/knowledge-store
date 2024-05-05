import { Request, Response } from "express";
import { Book } from "../../book";
import { AddBookDTO } from "../../dtos/add-book.dto";
import { BookNotCreatedError } from "../../errors/book-not-created.error";
import { AddBookUseCase } from "./add-book.use-case";

export class AddBookController {
  constructor(private readonly addBookUseCase: AddBookUseCase) {}

  async run(
    req: Request,
    res: Response
  ): Promise<Response<Book> | Response<BookNotCreatedError>> {
    const { title, author, publicationYear, publisher, reference } = req.body;

    try {
      const addBookDto: AddBookDTO = {
        title,
        author,
        publicationYear,
        publisher,
        reference,
      };
      const book = await this.addBookUseCase.execute(addBookDto);
      return res.status(201).send(book);
    } catch (error) {
      if (error instanceof BookNotCreatedError) {
        return res.status(400).send();
      }
      return res.status(500).send();
    }
  }
}
