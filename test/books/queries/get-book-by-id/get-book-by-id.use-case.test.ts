import { BookNotFoundError } from "../../../../src/books/errors/book-not-found.error";
import { GetBookByIdUseCase } from "../../../../src/books/queries/get-book-by-id/get-book-by-id.use-case";
import { BookMother } from "../../book-mother";
import { mockBookRepository } from "../../mocked-book-repository";

describe("GetBookByIdUseCase", () => {
  let getBookByIdUseCase: GetBookByIdUseCase;

  beforeEach(() => {
    jest.clearAllMocks();
    getBookByIdUseCase = new GetBookByIdUseCase(mockBookRepository);
  });

  it("should return a book if the book exists", async () => {
    const bookId = "default-id";
    const book = BookMother.createBook();
    mockBookRepository.findById.mockResolvedValue(book);

    const result = await getBookByIdUseCase.execute(bookId);

    expect(result).toEqual(book);
  });

  it("should throw BookNotFoundError if the book doesn't exist", async () => {
    const bookId = "456";
    mockBookRepository.findById.mockResolvedValue(null);

    await expect(getBookByIdUseCase.execute(bookId)).rejects.toThrow(
      BookNotFoundError
    );
  });
});
