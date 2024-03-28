import { Router } from "express";
import {
  deleteBook,
  getBook,
  postBook,
  updateBook,
} from "../controllers/book.controller";
import { validateBook, validateUpdateBook } from "../validator/book.validator";
import { uploadBook } from "../uploads/book.upload";

const router = Router();

router.get("/", getBook);
router.post("/", uploadBook, validateBook, postBook);
router.patch("/:id", uploadBook, validateUpdateBook, updateBook);
router.delete("/:id", deleteBook);

export default router;
