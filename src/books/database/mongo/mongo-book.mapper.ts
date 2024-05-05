import { Book } from "../../book";
import { BookDoc } from "./mongo-book.schema";

export const mapBookDocToEntity = (bookDoc: BookDoc): Book => {
  const {
    _id,
    title,
    author,
    publicationYear,
    publisher,
    reference,
    totalCopies,
    availableCopies,
  } = bookDoc;

  return new Book(
    _id.toString(),
    title,
    author,
    publicationYear,
    publisher,
    reference,
    totalCopies,
    availableCopies
  );
};
