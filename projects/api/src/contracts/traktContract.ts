import { builder } from './_internal/builder.ts';
import { calendars } from './calendars/index.ts';
import { checkin } from './checkin/index.ts';
import { oauth } from './oauth/index.ts';
import { recommendations } from './recommendations/index.ts';
import { sync } from './sync/index.ts';
import { users } from './users/index.ts';

export const traktContract = builder
  .router({
    oauth,
    calendars,
    checkin,
    users,
    sync,
    recommendations,
  });
