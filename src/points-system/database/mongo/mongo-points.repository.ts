import { FilterQuery } from "mongoose";
import { UpdateScoreDTO } from "../../dtos/update-score.dto";
import { Point } from "../../point";
import { PointsRepository } from "../points.repository";
import { mapPointsDocToEntity } from "./mongo-points.mapper";
import PointsModel, { PointsDoc } from "./mongo-points.schema";

export class MongoPointsRepository implements PointsRepository {
  async findOneAndUpdate(
    updateScoreDTO: UpdateScoreDTO
  ): Promise<Point | null> {
    const { user, points, operation } = updateScoreDTO;

    let update: FilterQuery<PointsDoc> = {};
    if (operation) {
      update.$inc =
        operation === "add" ? { score: points } : { score: -points };
    }
    const pointsDoc = await PointsModel.findOneAndUpdate({ user }, update, {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true,
    });

    return pointsDoc ? mapPointsDocToEntity(pointsDoc) : null;
  }
}
