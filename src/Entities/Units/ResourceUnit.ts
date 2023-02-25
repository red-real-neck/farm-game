export enum Resources {
  WHEAT = "WHEAT",
  COW = "COW",
  CHICKEN = "CHICKEN",
}

interface ResourceUnitInterface {
  kill();
  get unit(): Resources;
}

export class ResourceUnit implements ResourceUnitInterface {
  private _unit: Resources;

  constructor(unit) {
    this._unit = unit;
  }

  kill() {
    throw new Error("Method not implemented.");
  }

  get unit() {
    return this._unit;
  }
}
