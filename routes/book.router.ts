import { Router } from "express";
import {
  deleteBook,
  getBook,
  postBook,
  updateBook,
} from "../controllers/book.controller";
import multer from "multer";
import { auth } from "../middlewares/auth.middleware";

const router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get("/", getBook);
router.use(auth);
router.post("/", upload.single("image"), postBook);
router.patch("/:id", upload.single("image"), updateBook);
router.delete("/:id", deleteBook);

export default router;
