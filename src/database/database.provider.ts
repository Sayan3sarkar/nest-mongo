import * as mongoose from 'mongoose';
import CONFIG from 'src/config/config';
import { DB_CONN } from 'src/constants';
import { PostSchema } from 'src/posts/schema/posts.schema';

export const databaseProviders = [
  {
    provide: DB_CONN,
    useFactory: async (): Promise<typeof mongoose> => {
      const options: mongoose.ConnectOptions = {
        socketTimeoutMS: 1000,
        serverSelectionTimeoutMS: 1000,
        connectTimeoutMS: 1000,
        minPoolSize: 1,
        maxPoolSize: 1,
      };
      const connection = await mongoose.connect(CONFIG.appMongoURL, options);

      connection.model('posts', PostSchema);
      return connection;
    },
  },
];
