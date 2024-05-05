import { BookFiltersDTO } from "../../../../src/books/errors/book-filters.dto";
import { GetBooksUseCase } from "../../../../src/books/queries/get-books/get-books.use-case";
import { BookMother } from "../../book-mother";
import { mockBookRepository } from "../../mocked-book-repository";

describe("GetBooksUseCase", () => {
  let getBooksUseCase: GetBooksUseCase;

  beforeEach(() => {
    jest.clearAllMocks();
    getBooksUseCase = new GetBooksUseCase(mockBookRepository);
  });

  it("should return a list of books matching the given filters", async () => {
    const books = BookMother.createBooks(2);
    const bookFilters: BookFiltersDTO = {
      title: "default-title",
      author: "default-author",
      publicationYear: 2024,
    };

    mockBookRepository.find.mockResolvedValue(books);

    const result = await getBooksUseCase.execute(bookFilters);

    expect(result).toEqual(books);
    expect(mockBookRepository.find).toHaveBeenCalledWith(bookFilters);
  });

  it("should return an empty list if no books match", async () => {
    const bookFilters: BookFiltersDTO = {
      title: "default-title",
      author: "default-author",
      publicationYear: 2024,
    };

    mockBookRepository.find.mockResolvedValue([]);

    const result = await getBooksUseCase.execute(bookFilters);

    expect(result).toEqual([]);
    expect(mockBookRepository.find).toHaveBeenCalledWith(bookFilters);
  });
});
