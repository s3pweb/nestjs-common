import { DynamicModule, Global, Module } from '@nestjs/common';
import { LoggingService } from './logging.service';

@Global()
@Module({})
export class LoggingModule {
  public static forRootAsync(options): DynamicModule {
    return {
      module: LoggingModule,
      providers: [
        {
          provide: 'LOGGING_CONFIG',
          useFactory: options.useFactory,
          inject: options.inject || [],
        },
        LoggingService,
      ],
      exports: [
        LoggingService,
      ],
    };
  }
}
