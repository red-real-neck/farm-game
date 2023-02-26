export enum UnitsLiveTime {
  WHEAT = 10,
  CHICKEN = 10,
  COW = 20,
}

export const BAR_WIDTH = `5vw`;
export const BAR_HEIGHT = `1vh`;

export interface UnitControllerInterface {
  start();
  kill();
  generateUI();
  updateUI();
  restartGetResourceTimer();
}
