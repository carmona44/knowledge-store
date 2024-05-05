import { BookLoan } from "../book-loan";
import { BookLoanFiltersDTO } from "../dtos/book-loan-filters.dto";
import { CreateBookLoanDTO } from "../dtos/create-book-loan.dto";
import { UpdateBookLoanDTO } from "../dtos/update-book-loan.dto";

export interface BookLoanRepository {
  create(createBookLoanDto: CreateBookLoanDTO): Promise<BookLoan | null>;
  find(bookLoanFilters: BookLoanFiltersDTO): Promise<BookLoan[]>;
  findByIdAndUpdate(
    id: string,
    updateBookLoanDto: UpdateBookLoanDTO
  ): Promise<BookLoan | null>;
}
