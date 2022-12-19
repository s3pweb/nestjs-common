import { v1 as uuidV1 } from 'uuid';
import { correlationId, correlationIdHeader } from '../index';

export function CorrelationIdMiddleware() {
  return (req: any, res: any, next: () => void) => {
    const correlationHeader = req.header(correlationId) || uuidV1();
    // make sure this is lower-cased, otherwise downstream stuff will barf.
    req.headers[correlationId] = correlationHeader;
    res.set(correlationIdHeader, correlationHeader);
    next();
  };
}
