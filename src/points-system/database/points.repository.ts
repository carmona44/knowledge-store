import { UpdateScoreDTO } from "../dtos/update-score.dto";
import { Point } from "../point";

export interface PointsRepository {
  findOneAndUpdate(updateScoreDto: UpdateScoreDTO): Promise<Point | null>;
}
