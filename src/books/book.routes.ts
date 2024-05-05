import express from "express";
import {
  addBookController,
  deleteBookController,
  getBookByIdController,
  getBooksController,
  updateBookController,
} from "./dependencies";

const bookRouter = express.Router();

bookRouter.post("/", addBookController.run.bind(addBookController));
bookRouter.delete("/:id", deleteBookController.run.bind(deleteBookController));
bookRouter.put("/:id", updateBookController.run.bind(updateBookController));
bookRouter.get("/:id", getBookByIdController.run.bind(getBookByIdController));
bookRouter.get("/", getBooksController.run.bind(getBooksController));

export { bookRouter };
