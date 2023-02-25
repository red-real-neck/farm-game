import { Resources } from "../../Entities/Units/ResourceUnit";
import { FieldItem } from "../../Entities/FieldItem";

enum UnitsLiveTime {
  WHEAT = 10,
}
export class UnitController {
  private _item: FieldItem;
  private _timer: NodeJS.Timer;
  private _restTime: number;
  private;

  constructor(fieldItem: FieldItem) {
    this._item = fieldItem;
    this.startLiveTimeCounter();
  }

  startLiveTimeCounter() {
    this._restTime = UnitsLiveTime[this._item.resourceType!];
    this._timer = setInterval(() => {
      if (this._restTime <= 0) {
        console.log("time ended");

        clearInterval(this._timer);
      } else {
        console.log("this._restTime:", this._restTime);
      }
      --this._restTime;
    }, 1000);
  }
}
