import { Test, TestingModule } from '@nestjs/testing';
import { LoggingService } from './logging.service';
import { METRICS_SERVICE } from '../prometheus';
import { MetricsServiceMock } from '../prometheus/mock/metrics-service.mock';
import { configMock } from './mock/config.mock';
import { ConfigModule } from '@nestjs/config';

describe(LoggingService.name, () => {
  let service: LoggingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          load: [configMock],
        }),
      ],
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
      service.debug('debug message');
      service.verbose('verbose message', 'logger_tests');
    });
  });
});
