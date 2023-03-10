import * as THREE from "three";
import { AudioController } from "./AudioController";
import {
  ScreenSizes,
  ScreenSizesController,
} from "./ScreenSizesController/ScreenSizesController";

export class Popup {
  private _popupEl: HTMLElement;
  private _trackedObject: THREE.Intersection<
    THREE.Object3D<THREE.Event>
  > | null;
  private _camera: THREE.Camera;
  private _sizes: ScreenSizes;
  private _feedEl: HTMLElement;
  private _barEl: HTMLElement;

  constructor(
    popupEl: HTMLElement,
    camera: THREE.Camera,
    sizesController: ScreenSizesController
  ) {
    this._popupEl = popupEl;
    this._camera = camera;
    this._sizes = sizesController.sizes;

    this._feedEl = document.querySelector("#feed") as HTMLElement;
    this._barEl = document.querySelector("#bar") as HTMLElement;

    popupEl.addEventListener("click", (event) => this._click(event));
  }

  hide() {
    this._popupEl.classList.remove("visible");
  }

  show() {
    this._popupEl.classList.add("visible");
  }

  set trackedObject(
    mesh: THREE.Intersection<THREE.Object3D<THREE.Event>> | null
  ) {
    this._trackedObject = mesh;
    this.show();
  }

  get trackedObject() {
    return this._trackedObject;
  }

  update() {
    if (!this._trackedObject) return;
    const point = this._trackedObject.object.position.clone();
    const screenProjection = point.project(this._camera);
    const translateX = screenProjection.x * this._sizes.width * 0.5;
    const translateY = -screenProjection.y * this._sizes.height * 0.5;

    this._popupEl.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`;
  }

  private _click(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.dataset.unit && !target.dataset.action) return;
    event.preventDefault();
    if (target.dataset.action) {
      this._trackedObject?.object.userData.itemEntity.feed();
    } else {
      this._trackedObject?.object.userData.itemEntity.setUnit(
        target.dataset.unit,
        this._camera,
        this._sizes
      );
    }
    this.hide();
    this._trackedObject = null;
    AudioController.getInstance().playSound("click");
  }

  public toggleToFeed() {
    this._barEl.classList.add("hidden");
    this._feedEl.classList.remove("hidden");
  }

  public toggleToBar() {
    this._barEl.classList.remove("hidden");
    this._feedEl.classList.add("hidden");
  }
}
