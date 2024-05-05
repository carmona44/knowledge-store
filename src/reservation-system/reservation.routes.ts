import express from "express";
import { borrowBookController, returnBookController } from "./dependencies";

const reservationRouter = express.Router();

reservationRouter.post(
  "/borrow",
  borrowBookController.run.bind(borrowBookController)
);
reservationRouter.post(
  "/return/:id",
  returnBookController.run.bind(returnBookController)
);

export { reservationRouter };
