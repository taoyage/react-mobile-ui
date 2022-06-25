import { IPullStatus } from './types';

export const PULL_STATUS: IPullStatus = {
  PULLING: 'pulling',
  CAN_RELEASE: 'canRelease',
  REFRESHING: 'refreshing',
  COMPLETE: 'complete',
};

export const DEFUALT_DURATION = 300;

export const FRICTION = 0.3;
