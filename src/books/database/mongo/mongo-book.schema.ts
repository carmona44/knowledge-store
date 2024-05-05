import mongoose, { HydratedDocument } from "mongoose";

interface IBook {
  title: string;
  author: string;
  publicationYear: number;
  publisher: string;
  reference: string;
  totalCopies: number;
  availableCopies: number;
}

const bookSchema = new mongoose.Schema<IBook>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  publicationYear: { type: Number, required: true },
  publisher: { type: String, required: true },
  reference: { type: String, required: true },
  totalCopies: { type: Number, default: 4 },
  availableCopies: { type: Number, default: 4 },
});

const BookModel = mongoose.model<IBook>("Book", bookSchema);

export default BookModel;

export type BookDoc = HydratedDocument<IBook>;
