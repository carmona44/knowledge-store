export type OperationType = "borrow" | "return";

export interface UpdateBookDTO {
  title?: string;
  author?: string;
  publicationYear?: number;
  publisher?: string;
  operation?: OperationType;
}
