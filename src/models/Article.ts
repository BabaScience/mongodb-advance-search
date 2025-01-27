import { Schema, model, Document } from 'mongoose';

interface IArticle extends Document {
  title: string;
  content: string;
  author: string;
  tags: string[];
  createdAt: Date;
}

const ArticleSchema = new Schema<IArticle>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  tags: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now },
});

// ArticleSchema.index({ title: 'text', author: 1, tags: 1 });
ArticleSchema.index({ title: 'text', content: 'text' });


export const Article = model<IArticle>('Article', ArticleSchema);