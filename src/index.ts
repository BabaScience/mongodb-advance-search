import express, { Request, Response } from 'express';
import { Article } from './models/Article';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';


import connectDB from './config/db';

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.get('/articles/search', async (req: Request, res: Response) => {
  try {
    const { title, author, tag, page = 1, limit = 10 } = req.query;

    // Build the query object
    const query: any = {};
    if (title) query.title = { $regex: title, $options: 'i' };
    if (author) query.author = author;
    if (tag) query.tags = tag;

    // Pagination
    const skip = (Number(page) - 1) * Number(limit);

    // Execute the query
    const articles = await Article.find(query)
      .skip(skip)
      .limit(Number(limit))
      .exec();

    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ message: 'Error searching articles', error });
  }
});


app.use((err: Error, req: Request, res: Response, next: Function) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});