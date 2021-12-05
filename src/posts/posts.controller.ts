import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
} from '@nestjs/common';
import {
  JoiValidationPipe,
  MongooseDocumentIDPipe,
} from 'src/pipes/validation.pipe';
import {
  CreatePostDTO,
  CreatePostType,
  UpdatePostDTO,
  UpdatePostType,
} from './posts.dto';
import { PostsService } from './posts.service';
import { PostDocument } from './schema/posts.schema';

@Controller('posts')
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  @Post('createPost')
  async createPost(
    @Body(new JoiValidationPipe(CreatePostDTO)) post: CreatePostType,
  ): Promise<{
    message: string;
    createdPost: PostDocument;
  }> {
    const createdPost = await this.postService.createPost(post);
    return {
      createdPost,
      message: 'Post Created Successfully',
    };
  }

  @Get('fetchPosts')
  async fetchPosts(@Request() req): Promise<PostDocument[]> {
    return await this.postService.fetchAllPosts();
  }

  @Get('/:id')
  async fetchPostById(@Param('id', new MongooseDocumentIDPipe()) id: string) {
    return await this.postService.fetchPostById(id);
  }

  @Put('/:id')
  async updatePostById(
    @Param('id', new MongooseDocumentIDPipe()) id: string,
    @Body(new JoiValidationPipe(UpdatePostDTO)) updatedPost: UpdatePostType,
  ): Promise<{ message: string }> {
    await this.postService.updatePostById(id, updatedPost);
    return {
      message: 'Modified post',
    };
  }

  @Delete('/:id')
  async deletePostById(@Param('id', new MongooseDocumentIDPipe()) id: string) {
    await this.postService.deletePostById(id);
    return {
      message: `Post having id ${id} deleted`,
    };
  }
}
