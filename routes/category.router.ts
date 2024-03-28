import { Router } from "express";
import {
  deleteCategory,
  getCategory,
  patchCategory,
  postCategory,
} from "../controllers/category.controller";

const router = Router();

router.get("/", getCategory);
router.post("/", postCategory);
router.patch("/:id", patchCategory);
router.delete("/:id", deleteCategory);

export default router;
