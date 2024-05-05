import { FilterQuery } from "mongoose";
import { Book } from "../../book";
import { AddBookDTO } from "../../dtos/add-book.dto";
import { UpdateBookDTO } from "../../dtos/update-book.dto";
import { BookFiltersDTO } from "../../errors/book-filters.dto";
import { BookRepository } from "../book.repository";
import { mapBookDocToEntity } from "./mongo-book.mapper";
import BookModel, { BookDoc } from "./mongo-book.schema";

export class MongoBookRepository implements BookRepository {
  async create(addBookDto: AddBookDTO): Promise<Book | null> {
    const bookDoc = new BookModel(addBookDto);
    await bookDoc.save();

    return bookDoc ? mapBookDocToEntity(bookDoc) : null;
  }

  async findById(id: string): Promise<Book | null> {
    const bookDoc = await BookModel.findById(id);

    return bookDoc ? mapBookDocToEntity(bookDoc) : null;
  }

  async find(bookFilters: BookFiltersDTO): Promise<Book[]> {
    const { title, author, publicationYear } = bookFilters;

    let filterQuery: FilterQuery<BookDoc> = {};
    if (title) {
      filterQuery.title = { $regex: title, $options: "i" };
    }
    if (author) {
      filterQuery.author = { $regex: author, $options: "i" };
    }
    if (publicationYear) {
      filterQuery.publicationYear = publicationYear;
    }

    const bookDocs = await BookModel.find(filterQuery);

    return bookDocs.length
      ? bookDocs.map((bookDoc) => mapBookDocToEntity(bookDoc))
      : [];
  }

  async findByIdAndUpdate(
    id: string,
    updateBookDto: UpdateBookDTO
  ): Promise<Book | null> {
    const { title, author, publicationYear, publisher, operation } =
      updateBookDto;

    let update: FilterQuery<BookDoc> = {};
    if (title) {
      update.title = title;
    }
    if (author) {
      update.author = author;
    }
    if (publicationYear) {
      update.publicationYear = publicationYear;
    }
    if (publisher) {
      update.publisher = publisher;
    }
    if (operation) {
      update.$inc =
        operation === "borrow"
          ? { availableCopies: -1 }
          : { availableCopies: 1 };
    }
    const bookDoc = await BookModel.findByIdAndUpdate(id, update, {
      new: true,
    });

    return bookDoc ? mapBookDocToEntity(bookDoc) : null;
  }

  async findByIdAndDelete(id: string): Promise<Book | null> {
    const bookDoc = await BookModel.findByIdAndDelete(id);

    return bookDoc ? mapBookDocToEntity(bookDoc) : null;
  }
}
