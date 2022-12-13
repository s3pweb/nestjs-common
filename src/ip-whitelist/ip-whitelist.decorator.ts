import { SetMetadata } from '@nestjs/common';

export const IP_WHITELIST_KEY = 'IPS_FILTER_KEY';

export const IpWhitelist = (...values: string[]) => SetMetadata(IP_WHITELIST_KEY, values);
