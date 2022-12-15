export interface MetricsInterface {

  /**
   * Increment the errors counter
   */
  incErrorsCounter(type: string, func: string);

  /**
   * Increment the warnings counter
   */
  incWarnsCounter(type: string, func: string);

  /**
   * Get the prometheus client (promClient)
   */
  getPrometheusClient();
}
