import { Test, TestingModule } from '@nestjs/testing';
import { LoggingService } from './logging.service';
import { METRICS_SERVICE } from '../prometheus';
import { MetricsServiceMock } from '../prometheus/mock/metrics-service.mock';

describe(LoggingService.name, () => {
  let service: LoggingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: METRICS_SERVICE,
          useValue: new MetricsServiceMock(),
        },
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
      service.getLogger('child');
      service.warn('');
      service.error('');
    });
  });
});
