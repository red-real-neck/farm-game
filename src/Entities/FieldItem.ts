import { Resources, ResourceUnit } from "./Units/ResourceUnit";
import { FieldItem3D } from "../3dObjects/FieldItem3D";
import { TextureStates } from "../3dObjects/Field3D";
import { UnitFabric } from "../Fabric/UnitFabric";
import { WheatUnitController } from "../Controllers/UnitController/WheatUnitController";
import { Food, FoodType } from "./Foods/Food";
import { ChickenUnitController } from "../Controllers/UnitController/ChickenUnitController";
import { UnitControllerInterface } from "../Controllers/UnitController/UnitControllerInterface";
import { CowUnitController } from "../Controllers/UnitController/CowUnitController";
import { FoodCollector } from "../Collector/FoodCollector";
import { ScreenSizes } from "../Controllers/ScreenSizesController/ScreenSizesController";

export enum FoodTypeByUnit {
  WHEAT = FoodType.WHEAT,
  CHICKEN = FoodType.EGG,
  COW = FoodType.MILK,
}

export class FieldItem {
  private _item3D: FieldItem3D;
  private _resourceUnit: ResourceUnit | null = null;
  private _unitController: UnitControllerInterface;
  private _food: Food | null;

  createItem3D(
    fieldHeight: number,
    fieldWidth: number,
    i: number,
    textures: TextureStates
  ): FieldItem3D {
    this._item3D = new FieldItem3D(fieldHeight, fieldWidth, i, textures, this);
    return this._item3D;
  }

  public setUnit(
    unit: Resources,
    camera: THREE.PerspectiveCamera,
    sizes: ScreenSizes
  ) {
    FoodCollector.getInstance().subItem(unit);
    this._resourceUnit = UnitFabric.createUnit(unit);
    this._item3D.update(this._resourceUnit);
    this._unitController;
    switch (unit) {
      case Resources.WHEAT:
        this._unitController = new WheatUnitController(this, camera, sizes);
        break;
      case Resources.COW:
        this._unitController = new CowUnitController(this, camera, sizes);
        break;
      case Resources.CHICKEN:
        this._unitController = new ChickenUnitController(this, camera, sizes);
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

  public collectFood() {
    if (!this._food) return;
    this._item3D.destroyFood();
    FoodCollector.getInstance().addItem(this._food);
  }

  get food() {
    return this._food;
  }

  get item3D() {
    return this._item3D;
  }

  render() {
    this._unitController?.updateUI();
  }
}
