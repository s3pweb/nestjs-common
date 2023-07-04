import { cacheControlHeader } from '../index';

export function cacheControlMiddleware() {
  return (req: any, res: any, next: () => void) => {
    res.set(cacheControlHeader, 'private, max-age=0, no-cache');
    next();
  };
}
