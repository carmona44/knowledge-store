import mongoose, { HydratedDocument } from "mongoose";

interface IPoint {
  user: string;
  score: number;
}

const pointsSchema = new mongoose.Schema<IPoint>({
  user: { type: String, required: true },
  score: { type: Number, default: 0 },
});

const PointsModel = mongoose.model<IPoint>("Points", pointsSchema);

export default PointsModel;

export type PointsDoc = HydratedDocument<IPoint>;
