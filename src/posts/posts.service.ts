import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Model, UpdateWriteOpResult } from 'mongoose';
import { POST_MODEL } from 'src/constants';
import { CreatePostType, UpdatePostType } from './posts.dto';
import { PostDocument } from './schema/posts.schema';

@Injectable()
export class PostsService {
  constructor(
    @Inject(POST_MODEL) private readonly postModel: Model<PostDocument>,
  ) {}

  async createPost(post: CreatePostType): Promise<PostDocument> {
    const createdPost = await this.postModel.create(post);
    return createdPost;
  }

  async fetchAllPosts(): Promise<PostDocument[]> {
    return await this.postModel.find().exec();
  }

  async fetchPostById(id: string) {
    const post = await this.postModel.findById(id);
    if (!post) {
      throw new HttpException(
        `Post not found`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    return post;
  }

  async updatePostById(
    id: string,
    updatedPostDetails: UpdatePostType,
  ): Promise<void> {
    const post = await this.fetchPostById(id);
    if (post) {
      const updatedPost = await this.postModel.updateOne(
        { id },
        { ...updatedPostDetails },
      );
      console.log(updatedPost.modifiedCount);
    }
  }

  async deletePostById(id: string): Promise<void> {
    const post = await this.fetchPostById(id);
    if (post) {
      const deletedPost = await this.postModel.deleteOne({ id });
      console.log(deletedPost.deletedCount);
    }
  }
}
