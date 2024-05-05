import { MongoPointsRepository } from "./database/mongo/mongo-points.repository";
import { PointsRepository } from "./database/points.repository";
import { OnAddPointsEventHandler } from "./event-handlers/on-add-points.event-handler";

// Instantiate Database
const getPointsRepository = (): PointsRepository => new MongoPointsRepository();
const pointsRepositorySingleton = getPointsRepository();

// Instantiate Event Handlers
export const addPointsHandler = new OnAddPointsEventHandler(
  pointsRepositorySingleton
);
