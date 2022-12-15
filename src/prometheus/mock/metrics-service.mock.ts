import { MetricsInterface } from '../../index';

export class MetricsServiceMock implements MetricsInterface {
  getPrometheusClient() {
    return null;
  }

  incErrorsCounter(type: string, func: string) {
    // -- Empty
  }

  incWarnsCounter(type: string, func: string) {
    // -- Empty
  }
}
