import * as THREE from "three";
import { FieldItem3D } from "../3dObjects/FieldItem3D";
import {
  ScreenSizes,
  ScreenSizesController,
} from "./ScreenSizesController/ScreenSizesController";

export class Picker3D {
  private _raycaster: THREE.Raycaster;
  private _sizes: ScreenSizes;
  private _pointer: THREE.Vector2;
  private _camera: THREE.Camera;
  private _itemsMeshes: THREE.Mesh[] = [];
  private _intersects: THREE.Intersection<THREE.Object3D<THREE.Event>>[] = [];

  constructor(
    camera: THREE.Camera,
    items3D: FieldItem3D[],
    sizesController: ScreenSizesController
  ) {
    this._sizes = sizesController.sizes;
    this._raycaster = new THREE.Raycaster();
    this._pointer = new THREE.Vector2(10000, 10000);
    this._camera = camera;
    for (let i = 0; i < items3D.length; i++) {
      this._itemsMeshes.push(items3D[i].mesh);
    }
    window.addEventListener("pointermove", (event) => {
      this._pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      this._pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
    });

    window.addEventListener("click", () => {
      this._pick();
    });
  }

  private _pick() {
    const popup = document.querySelector("#bar")! as HTMLElement;
    if (this._intersects.length === 0) {
      popup.classList.remove("visible");
      return;
    }
    const { object } = this._intersects[0];
    const point = object.position.clone();
    const screenProjection = point.project(this._camera);
    const translateX = screenProjection.x * this._sizes.width * 0.5;
    const translateY = -screenProjection.y * this._sizes.height * 0.5;

    popup.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`;
    popup.classList.add("visible");
  }

  public update() {
    this._raycaster.setFromCamera(this._pointer, this._camera);
    this._intersects = this._raycaster.intersectObjects(this._itemsMeshes);
  }

  get intersects(): THREE.Intersection<THREE.Object3D<THREE.Event>>[] {
    return this._intersects;
  }
}
