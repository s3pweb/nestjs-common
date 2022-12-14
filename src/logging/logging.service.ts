import { Injectable, LoggerService } from '@nestjs/common';
import { logger } from '@s3pweb/s3pweb-logger';

@Injectable()
export class LoggingService implements LoggerService {
  private readonly logger;

  constructor() {
    this.logger = logger.child({ child: LoggingService.name });
  }

  getLogger(child: string): any {
    return this.logger.child({ child });
  }

  log(message: any, context?: string): any {
    this.logger.info({ child: context }, message);
  }

  warn(message: any, context?: string): any {
    this.logger.warn({ child: context }, message);
  }

  error(message: any, trace?: string, context?: string): any {
    const err = {
      message: message.toString(),
      name: 'Error',
      stack: trace,
    };
    this.logger.error({ err, child: context }, message);
  }
}
