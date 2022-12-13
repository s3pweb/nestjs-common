import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IP_WHITELIST_KEY } from './ip-whitelist.decorator';
import { getClientIp } from 'request-ip';

@Injectable()
export class IpWhitelistGuard implements CanActivate {
  constructor(@Inject(Reflector.name) protected readonly reflector: Reflector) {
    // -- Empty
  }

  canActivate(context: ExecutionContext): boolean {
    // Get the IPs list from @IpsFilter for the resource
    const ipsWhiteList = this.reflector.getAllAndOverride<string[]>(IP_WHITELIST_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // If there is no @IpsFilter or it's empty, do not use the filter
    if (!ipsWhiteList || ipsWhiteList.length === 0) {
      return true;
    }

    // Extract the IP from request context
    const clientIp = getClientIp(context.switchToHttp().getRequest());

    // Check the client's IP against the white list
    return ipsWhiteList.includes(clientIp);
  }
}
