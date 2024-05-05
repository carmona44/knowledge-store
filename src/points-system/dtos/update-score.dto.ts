export interface UpdateScoreDTO {
  user: string;
  points: number;
  operation: "add" | "substract";
}
