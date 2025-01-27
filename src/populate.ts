import { faker } from "@faker-js/faker";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { Article } from "./models/Article";

dotenv.config();

mongoose
  .connect("mongodb://localhost:27017/search-articles")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

const generateArticles = () => {
  return {
    title: `Bug: ${faker.hacker.phrase()}`,
    content: faker.lorem.paragraphs(3), 
    tags: [faker.hacker.noun(), faker.hacker.adjective(), "bug"],
    author: faker.internet.userName(),
    createdAt: faker.date.past(), 
  };
};

const populateDatabase = async () => {
  try {
    // Generate 100 articles
    const bugs = Array.from({ length: 100 }, generateArticles);

    await Article.insertMany(bugs);
    console.log("100 articles inserted successfully!");
  } catch (error) {
    console.error("Error inserting articles:", error);
  } finally {
    mongoose.connection.close();
  }
};

populateDatabase();