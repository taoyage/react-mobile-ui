import { TPullStatus, TPullKey } from './types';

export const PULL_STATUS: Record<TPullKey, TPullStatus> = {
  PULLING: 'pulling',
  CAN_RELEASE: 'canRelease',
  REFRESHING: 'refreshing',
  COMPLETE: 'complete',
};

export const DEFUALT_DURATION = 300;

export const FRICTION = 0.3;
