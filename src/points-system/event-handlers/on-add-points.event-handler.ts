import eventManager from "../../shared/event-manager/event-manager";
import { pointsEvents } from "../../shared/event-manager/events/points-events";
import { PointsRepository } from "../database/points.repository";
import { UpdateScoreDTO } from "../dtos/update-score.dto";

export class OnAddPointsEventHandler {
  constructor(private readonly pointsRepository: PointsRepository) {
    this.handle = this.handle.bind(this);
    eventManager.on(pointsEvents.add, this.handle);
  }

  private async handle(user: string) {
    if (!user) {
      return;
    }

    const updateScoreDto: UpdateScoreDTO = {
      user,
      points: 5,
      operation: "add",
    };
    await this.pointsRepository.findOneAndUpdate(updateScoreDto);
  }
}
