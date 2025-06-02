export type Platform = 'tma' | 'browser';

export interface PlatformInfo {
  platform: Platform;
  isTma: boolean;
  isBrowser: boolean;
}