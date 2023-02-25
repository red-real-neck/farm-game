import { Chicken } from "../Entities/Units/Chicken";
import { Cow } from "../Entities/Units/Cow";
import { Resources, ResourceUnit } from "../Entities/Units/ResourceUnit";
import { Wheat } from "../Entities/Units/Wheat";

export class UnitFabric {
  static createUnit(unit: Resources): ResourceUnit {
    let newUnit;
    switch (unit) {
      case Resources.CHICKEN:
        newUnit = new Chicken();
        break;
      case Resources.COW:
        newUnit = new Cow();
        break;
      case Resources.WHEAT:
        newUnit = new Wheat();
        break;
    }

    return newUnit;
  }
}
