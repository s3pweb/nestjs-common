import { IpWhitelistGuard } from './ip-whitelist.guard';
import { Reflector } from '@nestjs/core';
import { contextMock } from './mock/context.mock';

describe(IpWhitelistGuard.name, () => {
  let guard: IpWhitelistGuard;
  let reflector: Reflector;

  beforeEach(() => {
    reflector = new Reflector();
    guard = new IpWhitelistGuard(reflector);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  describe('canActivate', () => {
    it('should return true with a valid IP', async () => {
      reflector.getAllAndOverride = jest.fn().mockReturnValueOnce(['0.0.0.0']);
      expect(guard.canActivate(contextMock)).toEqual(true);
    });

    it('should return true no IP', async () => {
      reflector.getAllAndOverride = jest.fn().mockReturnValueOnce(null);
      expect(guard.canActivate(contextMock)).toEqual(true);
    });

    it('should return true with an empty IP array', async () => {
      reflector.getAllAndOverride = jest.fn().mockReturnValueOnce([]);
      expect(guard.canActivate(contextMock)).toEqual(true);
    });

    it('should return false with an invalid IP', async () => {
      reflector.getAllAndOverride = jest.fn().mockReturnValueOnce(['192.168.1.1']);
      expect(guard.canActivate(contextMock)).toEqual(false);
    });
  });
});
