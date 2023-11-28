# Request tracker middleware example

This middleware will log each request processed by NestJS.
You need to set it in the AppModule file:

```typescript
@Module({
  imports: [],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(RequestTrackerMiddleware).forRoutes('/');
  }
}
```

Then create a new middleware with the following content:

```typescript
import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { PromService } from '../../controllers/prom/prom.service';
import { Constants } from '../constants.utils';
import { LoggingService, METRICS_SERVICE } from '@s3pweb/nestjs-common';
import { getClientIp } from 'request-ip';

@Injectable()
export class RequestTrackerMiddleware implements NestMiddleware {
  private readonly log;
  private readonly excludedRoutes;

  constructor(
    logger: LoggingService,
    @Inject(METRICS_SERVICE) private readonly promClient: PromService,
  ) {
    this.log = logger.getLogger('RequestTracker');
    this.excludedRoutes = {
      '/metrics': true,
      '/health': true,
    };
  }

  use(req: Request, res: Response, next: () => void): void {
    const start = process.hrtime();
    const uuid: string = req.headers[Constants.correlationId]?.toString();
    const clientIp = getClientIp(req);

    res.once('close', () => {
      const diff = process.hrtime(start);
      const responseTimeInMs = diff[0] * 1e3 + diff[1] * 1e-6;

      let url = req.baseUrl.split('?')[0];

      if (req.route?.path) {
        url = url + req.route.path.toString();
      }

      // We need to cast req to any because user object is not in type
      const anyReq: any = req;
      const userId: string = anyReq.user?._id?.toString();
      // If the connection was closed, we set the status code as HTTP 408 to log a failure, because Nest set a HTTP 200
      const statusCode: string = res.writableEnded ? res.statusCode.toString() : '408';

      // metrics route is excluded to reduce log and prometheus spam
      if (!this.excludedRoutes[req.originalUrl]) {
        const message = `${req.method} ${req.originalUrl} (${userId} from ${clientIp}), HTTP ${statusCode}, Request total time ${responseTimeInMs.toFixed(2)} ms.`;

        // Log more data if we send back an error
        if (res.statusCode >= 400 || !res.writableEnded) {
          const failedRequest = {
            query: req.query,
            params: req.params,
            body: req.body,
          };
          this.log.warn({ uuid }, `${message}\nFailed request: ${JSON.stringify(failedRequest, null, 2)}`);
          // Track failed request
          this.promClient.incFailedRequestsCounter(req.method, url, statusCode, userId);
        } else if (Constants.verboseUsers[userId] === true) {
          // User is in verbose mode
          const verboseRequest = {
            query: req.query,
            params: req.params,
            body: req.body,
          };
          this.log.info({ uuid }, `${message}\nVerbose request: ${JSON.stringify(verboseRequest, null, 2)}`);
        } else {
          this.log.info({ uuid }, message);
        }

        // Track request
        this.promClient.incRequestsCounter(req.method, url, userId, clientIp?.toString());
      }
      // Track response time
      this.promClient.observeRequestDuration(req.method, url, statusCode, responseTimeInMs);
    });

    next();
  }
}
```
