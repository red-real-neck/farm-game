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
    if (!FoodCollector.getInstance().checkWheat()) {
      this.showErrorMessage();
      return;
    }
    FoodCollector.getInstance().subItem(Resources.WHEAT);
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
    if (!this._resourceUnit) return null;
    return this._resourceUnit.unit;
  }

  public newFood() {
    if (!this.resourceType) {
      throw new Error("this.resourceType cannot be null");
    }
    this._food = new Food(FoodTypeByUnit[this.resourceType]);
    this._item3D.showFood(this._food);
  }

  public collectFood() {
    if (!this._food) return;
    this._item3D.destroyFood();
    FoodCollector.getInstance().addItem(this._food);
    this._unitController.restartGetResourceTimer();
    this._food = null;
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

  public feed() {
    FoodCollector.getInstance().subItem(Resources.WHEAT);
    this._unitController?.feed();
  }

  private showErrorMessage() {
    function delay(ms) {
      return new Promise((resolve, reject) => {
        setTimeout(resolve, ms);
      });
    }

    if (document.querySelector(".wheat_err__wrapper")) {
      document.body.removeChild(
        document.querySelector(".wheat_err__wrapper") as HTMLElement
      );
    }

    const errorWrapper = document.createElement("div");
    const errorMessage = document.createElement("div");
    errorWrapper.classList.add("wheat_err__wrapper");
    errorWrapper.classList.add("visible");
    errorMessage.classList.add("err_message");
    errorMessage.innerText = "Не хватает зерна 😢";
    errorWrapper.appendChild(errorMessage);
    document.body.appendChild(errorWrapper);

    delay(2500).then(() => {
      errorWrapper.classList.remove("visible");
      delay(1000).then(() => {
        document.body.removeChild(errorWrapper);
      });
    });
  }
}
