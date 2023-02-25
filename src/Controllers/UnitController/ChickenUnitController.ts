import { Resources } from "../../Entities/Units/ResourceUnit";
import { FieldItem } from "../../Entities/FieldItem";
import {
  UnitControllerInterface,
  UnitsLiveTime,
} from "./UnitControllerInterface";

export class ChickenUnitController implements UnitControllerInterface {
  private _item: FieldItem;
  private _restTime: number;

  constructor(fieldItem: FieldItem) {
    this._item = fieldItem;
  }

  private startLiveTimeCounter() {
    let timer;
    this._restTime = UnitsLiveTime[this._item.resourceType!];
    timer = setInterval(() => {
      if (this._restTime <= 0) {
        clearInterval(timer);
        this._item.newFood();
      } else {
        console.log("this._restTime:", this._restTime);
      }
      --this._restTime;
    }, 1000);
  }

  start() {
    this.startLiveTimeCounter();
  }
  kill() {
    throw new Error("Method not implemented.");
  }
}
