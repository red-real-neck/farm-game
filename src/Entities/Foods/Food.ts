import { FoodTypeByUnit } from "../FieldItem";

export enum FoodType {
  WHEAT = "WHEAT",
  EGG = "EGG",
  MILK = "MILK",
}

export class Food {
  private _type: FoodType;

  constructor(type: FoodTypeByUnit) {
    console.log("food type:", type);
    this._type = FoodType[type];
  }

  get type() {
    return this._type;
  }
}
