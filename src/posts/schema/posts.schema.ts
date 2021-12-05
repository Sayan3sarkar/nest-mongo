import { Document, Schema } from 'mongoose';

export type PostDocument = Document & {
  title: string;
  content: string;
  creator: string;
};

export const PostSchema = new Schema<PostDocument>(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    creator: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
    strict: true,
  },
);
