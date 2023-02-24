import * as THREE from "three";
import {
  ScreenSizes,
  ScreenSizesController,
} from "./ScreenSizesController/ScreenSizesController";

export class Popup {
  private _popupEl: HTMLElement;
  private _trackedObject: THREE.Intersection<THREE.Object3D<THREE.Event>>;
  private _camera: THREE.Camera;
  private _sizes: ScreenSizes;

  constructor(
    popupEl: HTMLElement,
    camera: THREE.Camera,
    sizesController: ScreenSizesController
  ) {
    this._popupEl = popupEl;
    this._camera = camera;
    this._sizes = sizesController.sizes;
  }

  hide() {
    this._popupEl.classList.remove("visible");
  }

  show() {
    this._popupEl.classList.add("visible");
  }

  set trackedObject(mesh: THREE.Intersection<THREE.Object3D<THREE.Event>>) {
    this._trackedObject = mesh;
    this.show();
  }

  update() {
    if (!this._trackedObject) return;
    const point = this._trackedObject.object.position.clone();
    const screenProjection = point.project(this._camera);
    const translateX = screenProjection.x * this._sizes.width * 0.5;
    const translateY = -screenProjection.y * this._sizes.height * 0.5;

    this._popupEl.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`;
  }
}
