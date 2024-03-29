import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { json } from "body-parser";
import categoryRoutes from "./routes/category.router";
import bookRoutes from "./routes/book.router";
import authRoutes from "./routes/auth.router";
import cors from "cors";
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(json());
app.use(cors());
app.use("/auth", authRoutes);
app.use("/categories", categoryRoutes);
app.use("/books", bookRoutes);

app.use("*", (req: Request, res: Response) => {
  res.status(404).json({
    message: "resource not found",
  });
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
