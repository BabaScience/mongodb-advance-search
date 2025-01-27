import express, { Request, Response } from "express";
import { Article } from "./models/Article";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());

// Full-text search endpoint
// @ts-ignore
app.get("/articles/search", async (req: Request, res: Response) => {
  try {
    const { query, page = 1, limit = 10 } = req.query;

    if (!query) {
      return res
        .status(400)
        .json({ message: "Please provide a search query" });
    }

    const skip = (Number(page) - 1) * Number(limit);

    const articles = await Article.find(
      { $text: { $search: query as string } }, 
      { score: { $meta: "textScore" } } 
    )
      .sort({ score: { $meta: "textScore" } }) 
      .skip(skip)
      .limit(Number(limit))
      .exec();

    res.status(200).json(articles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error searching articles", error });
  }
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: Function) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});