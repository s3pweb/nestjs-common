[![npm (scoped)](https://img.shields.io/npm/v/@s3pweb/nestjs-common)](https://www.npmjs.com/package/@s3pweb/nestjs-common)

# S3PWeb - NestJS common libs

A repo containing all the common utilities for our NestJS projects:
- A NestJS guard to authorise only the given IP(s)
- A logging service implementing the LoggerService interface and using the [@s3pweb/s3pweb-logger](https://github.com/s3pweb/s3pweb-logger)
- A MetricsInterface to be used in the logging service

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

Directly on a route (with the guard on the controller):
```ts
@Post()
@IpWhitelist('192.168.1.1')
async createCat() {}
```

### Logging Service

To use the `LoggingModule`, add it to the imports of the `AppModule`, and then:

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

To use the PromService in a Controller or a Service, you can inject it in a constructor with:
```ts
@Inject(METRICS_SERVICE) private readonly metricsService: PromService,
```

### Metrics Interface

This interface enables you to implements the required functions for the `LoggingService`.
