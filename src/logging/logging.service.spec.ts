import { Test, TestingModule } from '@nestjs/testing';
import { LoggingService } from './logging.service';

describe(LoggingService.name, () => {
  let service: LoggingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoggingService,
      ],
    }).compile();

    service = module.get<LoggingService>(LoggingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('LoggerService', () => {
    it('should not fail', async () => {
      service.log('');
      service.warn('');
      service.error('');
    });
  });
});
