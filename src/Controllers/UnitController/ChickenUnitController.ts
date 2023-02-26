import { Resources } from "../../Entities/Units/ResourceUnit";
import { FieldItem } from "../../Entities/FieldItem";
import {
  BAR_HEIGHT,
  BAR_WIDTH,
  UnitControllerInterface,
  UnitsLiveTime,
} from "./UnitControllerInterface";
import { ScreenSizes } from "../ScreenSizesController/ScreenSizesController";

const HUNGER_TIMEL: number = 30;

export class ChickenUnitController implements UnitControllerInterface {
  private _item: FieldItem;
  private _restTime: number = 0;
  private _restHungerTime: number = HUNGER_TIMEL;
  private _getResourceTimer;
  private _hungerTimer: number;
  private _isHunger: boolean = false;
  private _sizes: ScreenSizes;
  private _camera: THREE.PerspectiveCamera;
  private _barWrapper: HTMLElement;
  private _resourceGenerateBar: HTMLElement;
  private _resourceGenerateFill: HTMLElement;

  private _hungerWrapper: HTMLElement;
  private _hungerBar: HTMLElement;
  private _hungerFill: HTMLElement;

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
        if (this._isHunger) {
          this.resetGetResourceTimeCounter();
          this._restTime = 0;
          return;
        }
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
    this._restHungerTime = HUNGER_TIMEL;
    timer = setInterval(() => {
      if (this._restHungerTime === 1) {
        this._isHunger = true;
        this.resetHungerTimeCounter();
      } else {
        console.log("hunger timer:", this._restHungerTime);
      }
      this._restHungerTime -= 1;
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

    this.generateGetResourceUI();
    this.generateHungerUI();
  }

  updateUI() {
    this.updateGerResourceUI();
    this.updateHungerUI();
  }

  private updateGerResourceUI() {
    this._resourceGenerateFill.style.width = `${
      this._isHunger
        ? 0
        : (UnitsLiveTime[this._item.resourceType!] / this._restTime) * 10
    }%`;

    const point = this._item.item3D.mesh.position.clone();
    const screenProjection = point.project(this._camera);
    const translateX = screenProjection.x * this._sizes.width * 0.5;
    const translateY = -screenProjection.y * this._sizes.height * 0.5;

    this._barWrapper.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`;
  }

  private updateHungerUI() {
    const coeff = (HUNGER_TIMEL / this._restHungerTime) * 10;
    this._hungerFill.style.width = `${100 - coeff}%`;

    this._hungerFill.style.background = `rgb(${75 + coeff}, ${
      154 - coeff
    }, 66)`;

    const point = this._item.item3D.mesh.position.clone();
    const screenProjection = point.project(this._camera);
    const translateX = screenProjection.x * this._sizes.width * 0.5;
    const translateY = -screenProjection.y * this._sizes.height * 0.5;

    this._hungerWrapper.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`;
  }

  private generateGetResourceUI() {
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

  private generateHungerUI() {
    this._hungerWrapper = document.createElement("div");
    this._hungerWrapper.classList.add("bar-wrapper");
    this._hungerBar = document.createElement("div");
    this._hungerFill = document.createElement("div");

    this._hungerBar.classList.add("hunger-progress-bar");
    this._hungerFill.classList.add("progress-fill__hunger");

    this._hungerBar.appendChild(this._hungerFill);

    this._hungerBar.style.width = BAR_WIDTH;
    this._hungerBar.style.height = BAR_HEIGHT;

    const point = this._item.item3D.mesh.position.clone();
    const screenProjection = point.project(this._camera);
    const translateX = screenProjection.x * this._sizes.width * 0.5;
    const translateY = -screenProjection.y * this._sizes.height * 0.5;

    this._hungerWrapper.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`;
    this._hungerWrapper.style.width = BAR_WIDTH;
    this._hungerWrapper.style.height = BAR_HEIGHT;

    this._hungerWrapper.appendChild(this._hungerBar);
    document.body.appendChild(this._hungerWrapper);
  }

  restartGetResourceTimer() {
    this.resetGetResourceTimeCounter();
    this.startGetResourceTimeCounter();
  }
}
