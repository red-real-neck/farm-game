import { Resources, ResourceUnit } from "./Units/ResourceUnit";
import { FieldItem3D } from "../3dObjects/FieldItem3D";
import { TextureStates } from "../3dObjects/Field3D";
import { UnitFabric } from "../Fabric/UnitFabric";
import { WheatUnitController } from "../Controllers/UnitController/WheatUnitController";
import { Food, FoodType } from "./Foods/Food";
import { ChickenUnitController } from "../Controllers/UnitController/ChickenUnitController";
import { UnitControllerInterface } from "../Controllers/UnitController/UnitControllerInterface";
import { CowUnitController } from "../Controllers/UnitController/CowUnitController";

export enum FoodTypeByUnit {
  WHEAT = FoodType.WHEAT,
  CHICKEN = FoodType.EGG,
  COW = FoodType.MILK,
}

export class FieldItem {
  private _item3D: FieldItem3D;
  private _resourceUnit: ResourceUnit | null = null;
  private _unitController: UnitControllerInterface;
  private _food: Food;

  createItem3D(
    fieldHeight: number,
    fieldWidth: number,
    i: number,
    textures: TextureStates
  ): FieldItem3D {
    this._item3D = new FieldItem3D(fieldHeight, fieldWidth, i, textures, this);
    return this._item3D;
  }

  public setUnit(unit: Resources) {
    this._resourceUnit = UnitFabric.createUnit(unit);
    this._item3D.update(this._resourceUnit);
    this._unitController;
    switch (unit) {
      case Resources.WHEAT:
        this._unitController = new WheatUnitController(this);
        break;
      case Resources.COW:
        this._unitController = new CowUnitController(this);
        break;
      case Resources.CHICKEN:
        this._unitController = new ChickenUnitController(this);
        break;
    }
    this._unitController.start();
  }

  get resourceType() {
    return this._resourceUnit!.unit;
  }

  public newFood() {
    this._food = new Food(FoodTypeByUnit[this.resourceType]);
    this._item3D.showFood(this._food);
  }
}
