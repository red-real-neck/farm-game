import { Resources } from "../../Entities/Units/ResourceUnit";
import { FieldItem } from "../../Entities/FieldItem";
import {
  UnitControllerInterface,
  UnitsLiveTime,
} from "./UnitControllerInterface";

const HUNGER_TIMEL: number = 30;

export class ChickenUnitController implements UnitControllerInterface {
  private _item: FieldItem;
  private _getResourceTimer;
  private _hungerTimer: number;
  private _isHunger: boolean = false;

  constructor(fieldItem: FieldItem) {
    this._item = fieldItem;
  }

  private startGetResourceTimeCounter() {
    let timer;
    let restTime = UnitsLiveTime[this._item.resourceType!];
    timer = setInterval(() => {
      if (restTime <= 0) {
        this.resetGetResourceTimeCounter();
        if (!this._isHunger) this._item.newFood();
      } else {
        // update UI
        console.log("get resource time:", restTime);
      }
      restTime -= 1;
    }, 1000);
    this._getResourceTimer = timer;
  }

  start() {
    this.startGetResourceTimeCounter();
    this.startHungerTimer();
  }

  startHungerTimer() {
    let timer;
    let restTime = HUNGER_TIMEL;
    timer = setInterval(() => {
      if (restTime <= 0) {
        this._isHunger = true;
      } else {
        // update UI
        console.log("hunger timer:", restTime);
      }
      restTime -= 1;
    }, 1000);
    this._hungerTimer = timer;
  }

  private resetGetResourceTimeCounter() {
    clearInterval(this._getResourceTimer);
  }

  private resetHungerTimeCounter() {
    clearInterval(this._hungerTimer);
  }

  kill() {
    throw new Error("Method not implemented.");
  }
}
