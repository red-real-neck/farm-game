export enum UnitsLiveTime {
  WHEAT = 10,
  CHICKEN = 10,
  COW = 20,
}

export interface UnitControllerInterface {
  start();
  kill();
  generateUI();
  updateUI();
}
