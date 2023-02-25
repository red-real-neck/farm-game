export enum UnitsLiveTime {
  WHEAT = 1,
  CHICKEN = 1,
  COW = 1,
}

export interface UnitControllerInterface {
  start();
  kill();
}
