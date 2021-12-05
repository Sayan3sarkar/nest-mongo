import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const ENV = process.env;

const CONFIG = {
  appPort: ENV.APP_PORT || 3000,
  appMongoURL: ENV.APP_MONGO_URL,
};

export default CONFIG;
