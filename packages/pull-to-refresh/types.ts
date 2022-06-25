export type TPullStatus = 'pulling' | 'canRelease' | 'refreshing' | 'complete';

export interface IPullStatus {
  [key: string]: TPullStatus;
}
