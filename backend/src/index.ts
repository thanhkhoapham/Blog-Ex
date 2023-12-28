import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import postRoutes from "./routes/posts";

dotenv.config();

const app: Express = express();

app.use(cors());
app.use(bodyParser.json());

const port = process.env.PORT || 8080;

app.get("/", (req: Request, res: Response) => {
  res.send("My Server");
});

app.use('/api/posts', postRoutes);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
