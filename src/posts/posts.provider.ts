import { Connection, Model } from 'mongoose';
import { DB_CONN, POST_MODEL } from 'src/constants';
import { PostDocument, PostSchema } from './schema/posts.schema';

const PostModel = (connection: Connection): Model<PostDocument> =>
  connection.model('posts', PostSchema);

export const PostModelProviders = {
  provide: POST_MODEL,
  useFactory: PostModel,
  inject: [DB_CONN],
};
