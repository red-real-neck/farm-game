import { Resources } from "../../Entities/Units/ResourceUnit";
import { FieldItem } from "../../Entities/FieldItem";
import {
  UnitControllerInterface,
  UnitsLiveTime,
} from "./UnitControllerInterface";
import { ScreenSizes } from "../ScreenSizesController/ScreenSizesController";

const HUNGER_TIMEL: number = 30;
const BAR_WIDTH = `5vw`;
const BAR_HEIGHT = `1vh`;

export class ChickenUnitController implements UnitControllerInterface {
  private _item: FieldItem;
  private _restTime: number = 0;
  private _getResourceTimer;
  private _hungerTimer: number;
  private _isHunger: boolean = false;
  private _sizes: ScreenSizes;
  private _camera: THREE.PerspectiveCamera;
  private _barWrapper: HTMLElement;
  private _resourceGenerateBar: HTMLElement;
  private _resourceGenerateFill: HTMLElement;

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

  private startGetResourceTimeCounter() {
    let timer;
    this._restTime = UnitsLiveTime[this._item.resourceType!];
    timer = setInterval(() => {
      if (this._restTime <= 0) {
        this.resetGetResourceTimeCounter();
        if (!this._isHunger) this._item.newFood();
      } else {
        // update UI
        console.log("get resource time:", this._restTime);
      }
      this._restTime -= 1;
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

  generateUI() {
    if (!this._item) {
      throw new Error("No field item provided for UI");
    }

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
    this._resourceGenerateFill.style.width = `${
      (UnitsLiveTime[this._item.resourceType!] / this._restTime) * 10
    }%`;

    const point = this._item.item3D.mesh.position.clone();
    const screenProjection = point.project(this._camera);
    const translateX = screenProjection.x * this._sizes.width * 0.5;
    const translateY = -screenProjection.y * this._sizes.height * 0.5;

    this._barWrapper.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`;
  }
}
