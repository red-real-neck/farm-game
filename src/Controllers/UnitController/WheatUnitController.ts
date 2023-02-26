import { Resources } from "../../Entities/Units/ResourceUnit";
import { FieldItem } from "../../Entities/FieldItem";
import {
  BAR_HEIGHT,
  BAR_WIDTH,
  UnitControllerInterface,
  UnitsLiveTime,
} from "./UnitControllerInterface";
import { ScreenSizes } from "../ScreenSizesController/ScreenSizesController";

export class WheatUnitController implements UnitControllerInterface {
  private _item: FieldItem;
  private _restTime: number;
  private _getResourceTimer;
  private _sizes: ScreenSizes;
  private _camera: THREE.PerspectiveCamera;
  private _barWrapper: HTMLDivElement;
  private _resourceGenerateBar: HTMLDivElement;
  private _resourceGenerateFill: any;

  constructor(
    fieldItem: FieldItem,
    camera: THREE.PerspectiveCamera,
    sizes: ScreenSizes
  ) {
    this._item = fieldItem;
    this._sizes = sizes;
    this._camera = camera;
    this.generateUI();
  }

  generateUI() {
    if (!this._item) {
      throw new Error("No field item provided for UI");
    }

    this.generateGetResourceUI();
  }

  restartGetResourceTimer() {
    this.resetGetResourceTimeCounter();
    this.startGetResourceTimeCounter();
  }

  private resetGetResourceTimeCounter() {
    clearInterval(this._getResourceTimer);
  }

  private startGetResourceTimeCounter() {
    let timer;
    this._restTime = UnitsLiveTime[this._item.resourceType!];
    timer = setInterval(() => {
      if (this._restTime === 1) {
        this.resetGetResourceTimeCounter();
        this._item.newFood();
      } else {
        // console.log("this._restTime:", this._restTime);
      }
      --this._restTime;
    }, 1000);
    this._getResourceTimer = timer;
  }

  generateGetResourceUI() {
    this._barWrapper = document.createElement("div");
    this._barWrapper.classList.add("bar-wrapper");
    this._resourceGenerateBar = document.createElement("div");
    this._resourceGenerateFill = document.createElement("div");

    this._resourceGenerateBar.classList.add("resource-progress-bar");
    this._resourceGenerateFill.classList.add("progress-fill");

    this._resourceGenerateBar.appendChild(this._resourceGenerateFill);

    this._resourceGenerateBar.style.width = BAR_WIDTH;
    this._resourceGenerateBar.style.height = BAR_HEIGHT;

    const point = this._item.item3D.mesh.position.clone();
    const screenProjection = point.project(this._camera);
    const translateX = screenProjection.x * this._sizes.width * 0.5;
    const translateY = -screenProjection.y * this._sizes.height * 0.5;

    this._barWrapper.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`;
    this._barWrapper.style.width = BAR_WIDTH;
    this._barWrapper.style.height = BAR_HEIGHT;

    this._barWrapper.appendChild(this._resourceGenerateBar);
    document.body.appendChild(this._barWrapper);
  }

  updateUI() {
    this.updateGerResourceUI();
  }

  private updateGerResourceUI() {
    this._resourceGenerateFill.style.width = `${
      100 - this._restTime / (UnitsLiveTime[this._item.resourceType!] / 100)
    }%`;

    const point = this._item.item3D.mesh.position.clone();
    const screenProjection = point.project(this._camera);
    const translateX = screenProjection.x * this._sizes.width * 0.5;
    const translateY = -screenProjection.y * this._sizes.height * 0.5;

    this._barWrapper.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`;
  }

  start() {
    this.startGetResourceTimeCounter();
  }
  kill() {
    throw new Error("Method not implemented.");
  }
}
