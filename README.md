[![npm (scoped)](https://img.shields.io/npm/v/@s3pweb/nestjs-common)](https://www.npmjs.com/package/@s3pweb/nestjs-common)

# S3PWeb - NestJS common libs

A repo containing all the common utilities for our NestJS projects:
- A NestJS guard to authorise only the given IP(s)
- A logging service implementing the LoggerService interface and using the [@s3pweb/s3pweb-logger](https://github.com/s3pweb/s3pweb-logger)
- A MetricsInterface to be used in the logging service
- Multiple middlewares

## Install
```shell
npm i @s3pweb/nestjs-common
```

## Usage

### IP Whitelist

On a controller to protect all routes:
```ts
@Controller('v1/cats')
@IpWhitelist('0.0.0.0', '::1')
@UseGuards(IpWhitelistGuard)
export class CatsController {}
```

Directly on a route (with the `UseGuards` on the controller):
```ts
@Post()
@IpWhitelist('192.168.1.1')
async createCat() {}
```

### Logging Service

To use the `LoggingModule`, add it to the imports of the `AppModule` with its configuration in a factory:

```ts
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    LoggingModule.forRootAsync({
      useFactory: async (config: ConfigService) => {
        return config.get('logger');
      },
      inject: [ConfigService],
    }),
    PromModule,
  ],
  controllers: [
    AppController,
  ],
})
export class AppModule implements NestModule {}
```

Then it can be used in a service:

```ts
@Injectable()
export class Service {
  private readonly log: any;

  constructor(
    logger: LoggingService,
  ) {
    this.log = logger.getLogger(Service.name);
  }
}
```

To be able ton inject it correctly, you need a metrics module exporting a service implementing the `MetricsInterface`:

```ts
@Global()
@Module({
  providers: [
    {
      provide: METRICS_SERVICE,
      useClass: PromService,
    },
  ],
  controllers: [PromController],
  exports: [
    {
      provide: METRICS_SERVICE,
      useClass: PromService,
    },
  ],
})
export class PromModule {
  // -- Empty
}
```

```ts
@Injectable()
export class PromService implements MetricsInterface {}
```

To use the PromService in a Controller or a Service, you can inject it in a constructor with:
```ts
@Inject(METRICS_SERVICE) private readonly metricsService: PromService,
```

### Metrics Interface

This interface enables you to implements the required functions for the `LoggingService`.

### Middlewares

### Cache Control

This middleware will add a new header to disable request caching (`Cache-Control`).

To set the middleware everywhere (in the bootstrap function of main.ts):

```ts
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Set Cache-Control header everywhere
  app.use(cacheControlMiddleware());
  
  // ...
}
```

#### Correlation ID

This middleware will add a new header in each request and response `X-Correlation-Id`, this is an uuid V1 string (different for each request/response).
It was lifted from https://github.com/eropple/nestjs-correlation-id/

To set the middleware everywhere (in the bootstrap function of main.ts):

```ts
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Tracking ID
  app.use(CorrelationIdMiddleware());
  
  // ...
}
```

You can then get the uuid in a controller:

```ts
@Controller('v1/cats')
export class CatsController {
  @Post()
  async createCat(
    @Headers(correlationId) uuid: string,
  ) {
    // console.log(uuid)
  }
}
```

#### HTTP Exceptions Logger

This middleware will log as a warning all failed HTTP request (with their uuid) to provide more details when an error occurs.
Example: `NotFoundException: Cannot GET /cats/v2/api/`

To set the middleware everywhere (in the bootstrap function of main.ts):
```ts
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Use our logger for all Nest logs
  const logger = await app.resolve(LoggingService);
  app.useLogger(logger);
  // Add custom filter to log all http errors
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new ExceptionsLoggerFilter(logger, httpAdapter));
}
```
