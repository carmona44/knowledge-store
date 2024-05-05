import { Request, Response } from "express";
import { Book } from "../../book";
import { BookFiltersDTO } from "../../errors/book-filters.dto";
import { GetBooksUseCase } from "./get-books.use-case";

export class GetBooksController {
  constructor(private readonly getBooksUseCase: GetBooksUseCase) {}

  async run(
    req: Request,
    res: Response
  ): Promise<Response<Book[]> | Response<Error>> {
    const { title, author, publicationYear } = req.query;

    try {
      const bookFiltersDTO: BookFiltersDTO = {
        title: title as string,
        author: author as string,
        publicationYear: parseInt(publicationYear as string),
      };
      const books = await this.getBooksUseCase.execute(bookFiltersDTO);
      return res.status(200).send(books);
    } catch (error) {
      return res.status(500).send(error);
    }
  }
}
