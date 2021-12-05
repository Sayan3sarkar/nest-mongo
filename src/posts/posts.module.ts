import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { PostsController } from './posts.controller';
import { PostsMiddleware } from './posts.middlware';
import { PostModelProviders } from './posts.provider';
import { PostsService } from './posts.service';

@Module({
  imports: [DatabaseModule],
  controllers: [PostsController],
  providers: [PostsService, PostModelProviders],
  exports: [PostsService, PostModelProviders],
})
export class PostsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(PostsMiddleware).forRoutes('/posts');
  }
}
