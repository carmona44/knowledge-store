import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import { BookLoan } from "../../book-loan";
import { BookLoanFiltersDTO } from "../../dtos/book-loan-filters.dto";
import { CreateBookLoanDTO } from "../../dtos/create-book-loan.dto";
import { UpdateBookLoanDTO } from "../../dtos/update-book-loan.dto";
import { BookLoanRepository } from "../book-loan.repository";
import BookLoanModel, { BookLoanDoc } from "./book-loan.schema";
import { mapBookLoanDocToEntity } from "./mongo-book-loan.mapper";

export class MongoBookLoanRepository implements BookLoanRepository {
  async create(createBookLoanDto: CreateBookLoanDTO): Promise<BookLoan | null> {
    const bookLoanDoc = new BookLoanModel(createBookLoanDto);
    await bookLoanDoc.save();

    return bookLoanDoc ? mapBookLoanDocToEntity(bookLoanDoc) : null;
  }

  async find(bookLoanFilters: BookLoanFiltersDTO): Promise<BookLoan[]> {
    const { user, limit, status } = bookLoanFilters;

    let filterQuery: FilterQuery<BookLoanDoc> = {};
    if (user) {
      filterQuery.user = user;
    }
    if (status) {
      filterQuery.returnDate =
        status === "borrowed" ? { $exists: false } : { $exists: true };
    }

    const queryOptions: QueryOptions = { limit };

    const bookLoanDocs = await BookLoanModel.find(
      filterQuery,
      {},
      queryOptions
    );

    return bookLoanDocs.length
      ? bookLoanDocs.map((bookLoanDoc) => mapBookLoanDocToEntity(bookLoanDoc))
      : [];
  }

  async findByIdAndUpdate(
    id: string,
    updateBookLoanDto: UpdateBookLoanDTO
  ): Promise<BookLoan | null> {
    const { returnDate } = updateBookLoanDto;

    let updateQuery: UpdateQuery<BookLoanDoc> = {};
    if (returnDate) {
      updateQuery.returnDate = returnDate;
    }
    const returnedBookLoan = await BookLoanModel.findByIdAndUpdate(
      id,
      updateQuery
    );

    return returnedBookLoan ? mapBookLoanDocToEntity(returnedBookLoan) : null;
  }
}
