export interface BookLoanFiltersDTO {
  user?: string;
  status?: "borrowed" | "returned";
  limit?: number;
}
