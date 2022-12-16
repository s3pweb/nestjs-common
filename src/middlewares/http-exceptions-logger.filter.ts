import { ArgumentsHost, Catch, HttpException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { LoggingService } from '../logging';
import { correlationId } from '../index';

@Catch()
export class HttpExceptionsLoggerFilter extends BaseExceptionFilter {
  private readonly log;

  constructor(logger: LoggingService, httpAdapter: any) {
    super(httpAdapter);
    this.log = logger.getLogger(HttpExceptionsLoggerFilter.name);
  }

  catch(exception: unknown, host: ArgumentsHost) {
    const uuid: string = host.switchToHttp().getRequest().headers[correlationId];
    // Log only HTTP exceptions, all others will be logged by the logging service as errors
    if (exception instanceof HttpException) {
      this.log.warn({ uuid }, `${exception}`);
    }
    super.catch(exception, host);
  }
}
