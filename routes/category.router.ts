import { Router } from "express";
import {
  deleteCategory,
  getBooksByCategoryId,
  getCategory,
  patchCategory,
  postCategory,
} from "../controllers/category.controller";

const router = Router();

router.get("/", getCategory);
router.get("/:id/books", getBooksByCategoryId);
router.post("/", postCategory);
router.patch("/:id", patchCategory);
router.delete("/:id", deleteCategory);

export default router;
