import express, { Express } from "express";
import dotenv from "dotenv";
import { json } from "body-parser";
import categoryRoutes from "./routes/category.router";
import bookRoutes from "./routes/book.router";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(json());
app.use(express.static("public"));
app.use("/categories", categoryRoutes);
app.use("/books", bookRoutes);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
