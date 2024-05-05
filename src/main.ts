import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import { bookRouter } from "./books/book.routes";
import { appConfig } from "./config";
import { pointsRouter } from "./points-system/points.routes";
import { reservationRouter } from "./reservation-system/reservation.routes";

const app: Express = express();
const port = appConfig.server.port;

mongoose.connect(appConfig.mongoURI);

app.use(express.json());
app.use("/books", bookRouter);
app.use("/reservation", reservationRouter);
app.use("/points", pointsRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the Book Library Tool API");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
