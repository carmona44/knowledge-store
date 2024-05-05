import { AddBookUseCase } from "../../../../src/books/commands/add-book/add-book.use-case";
import { AddBookDTO } from "../../../../src/books/dtos/add-book.dto";
import { BookNotCreatedError } from "../../../../src/books/errors/book-not-created.error";
import { BookMother } from "../../book-mother";
import { mockBookRepository } from "../../mocked-book-repository";

describe("AddBookUseCase", () => {
  let addBookUseCase: AddBookUseCase;

  beforeEach(() => {
    jest.clearAllMocks();
    addBookUseCase = new AddBookUseCase(mockBookRepository);
  });

  it("should create a book successfully", async () => {
    const addBookDto: AddBookDTO = {
      title: "New Book",
      author: "Author",
      publicationYear: 2024,
      publisher: "Publisher",
      reference: "Reference",
    };
    const createdBook = BookMother.createBook();

    mockBookRepository.create.mockResolvedValue(createdBook);

    const result = await addBookUseCase.execute(addBookDto);

    expect(result).toEqual(createdBook);
    expect(mockBookRepository.create).toHaveBeenCalledWith(addBookDto);
  });

  it("should throw BookNotCreatedError if book creation fails", async () => {
    const addBookDto: AddBookDTO = {
      title: "New Book",
      author: "Author",
      publicationYear: 2024,
      publisher: "Publisher",
      reference: "Reference",
    };

    mockBookRepository.create.mockResolvedValue(null);

    await expect(addBookUseCase.execute(addBookDto)).rejects.toThrow(
      BookNotCreatedError
    );
    expect(mockBookRepository.create).toHaveBeenCalledWith(addBookDto);
  });
});
