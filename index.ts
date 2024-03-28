import express, { Express } from "express";
import dotenv from "dotenv";
import { json } from "body-parser";
import categoryRoutes from "./routes/category.router";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(json());
app.use("/categories", categoryRoutes);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
