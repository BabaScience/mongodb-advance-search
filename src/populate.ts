import mongoose from 'mongoose';
import { Article } from './models/Article';
import dotenv from 'dotenv';

dotenv.config();


const sampleArticles = [
  {
    title: 'Introduction to Node.js',
    content: 'Node.js is a powerful runtime for building server-side applications.',
    author: 'John Doe',
    tags: ['nodejs', 'javascript', 'backend'],
  },
  {
    title: 'Getting Started with TypeScript',
    content: 'TypeScript adds static typing to JavaScript, making it more robust.',
    author: 'Jane Smith',
    tags: ['typescript', 'javascript', 'frontend'],
  },
  {
    title: 'Building REST APIs with Express',
    content: 'Express is a popular framework for building RESTful APIs in Node.js.',
    author: 'John Doe',
    tags: ['express', 'nodejs', 'backend'],
  },
  {
    title: 'MongoDB Basics',
    content: 'MongoDB is a NoSQL database that stores data in flexible, JSON-like documents.',
    author: 'Alice Johnson',
    tags: ['mongodb', 'database', 'nosql'],
  },
  {
    title: 'Advanced TypeScript Techniques',
    content: 'Learn advanced TypeScript features like decorators and generics.',
    author: 'Jane Smith',
    tags: ['typescript', 'advanced', 'frontend'],
  },
];

async function populateDatabase() {
  try {
    await mongoose.connect('mongodb://localhost:27017/search-articles', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as mongoose.ConnectOptions);

    console.log('Connected to MongoDB');

    await Article.deleteMany({});
    console.log('Cleared existing articles');

    await Article.insertMany(sampleArticles);
    console.log('Inserted sample articles');

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error populating database:', error);
  }
}

populateDatabase();