import { Point } from "../../point";
import { PointsDoc } from "./mongo-points.schema";

export const mapPointsDocToEntity = (pointsDoc: PointsDoc): Point => {
  const { _id, user, score } = pointsDoc;

  return new Point(_id.toString(), user, score);
};
