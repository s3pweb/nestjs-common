import { DynamicModule, Global, Module } from '@nestjs/common';
import { LoggingService } from './logging.service';
import { LOGGING_CONFIG } from './index';

@Global()
@Module({})
export class LoggingModule {
  static forRootAsync(options): DynamicModule {
    return {
      module: LoggingModule,
      providers: [
        {
          provide: LOGGING_CONFIG,
          useValue: options,
        },
        LoggingService,
      ],
      exports: [
        LoggingService,
        {
          provide: LOGGING_CONFIG,
          useValue: options,
        },
      ],
    };
  }
}
