import * as THREE from "three";
import { FieldItem3D } from "../3dObjects/FieldItem3D";
import { Popup } from "./Popup";
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
  private _popup: Popup;

  constructor(
    camera: THREE.Camera,
    items3D: FieldItem3D[],
    sizesController: ScreenSizesController
  ) {
    this._sizes = sizesController.sizes;
    this._raycaster = new THREE.Raycaster();
    this._pointer = new THREE.Vector2(10000, 10000);
    this._camera = camera;
    this._popup = new Popup(
      document.querySelector("#bar")! as HTMLElement,
      camera,
      sizesController
    );
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
    if (this._intersects.length === 0) {
      this._popup.hide();
      return;
    }
    this._popup.trackedObject = this._intersects[0];
  }

  public update() {
    this._popup.update();
    this._raycaster.setFromCamera(this._pointer, this._camera);
    this._intersects = this._raycaster.intersectObjects(this._itemsMeshes);
  }

  get intersects(): THREE.Intersection<THREE.Object3D<THREE.Event>>[] {
    return this._intersects;
  }
}
