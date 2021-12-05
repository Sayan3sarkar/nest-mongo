import { Injectable, NestMiddleware } from '@nestjs/common';
import * as express from 'express';

@Injectable()
export class PostsMiddleware implements NestMiddleware {
  use(req: express.Request, res: express.Response, next: express.NextFunction) {
    // express.raw({ type: '*/*' })(req, res, next);
    console.log(req.body);
    next();
  }
}
