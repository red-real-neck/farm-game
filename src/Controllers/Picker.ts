import * as THREE from "three";
import { FieldItem3D } from "../3dObjects/FieldItem3D";
import { Popup } from "./Popup";
import {
  ScreenSizes,
  ScreenSizesController,
} from "./ScreenSizesController/ScreenSizesController";

export class Picker3D {
  private _raycaster: THREE.Raycaster;
  private _pointer: THREE.Vector2;
  private _camera: THREE.Camera;
  private _itemsMeshes: THREE.Mesh[] = [];
  private _intersects: THREE.Intersection<THREE.Object3D<THREE.Event>>[] = [];
  private _popup: Popup;

  private _kill: boolean = false;

  constructor(
    camera: THREE.Camera,
    items3D: FieldItem3D[],
    sizesController: ScreenSizesController,
    canvas: HTMLCanvasElement
  ) {
    this._raycaster = new THREE.Raycaster();
    this._pointer = new THREE.Vector2(10000, 10000);
    this._camera = camera;
    this._popup = new Popup(
      document.querySelector("#popup-wrapper")! as HTMLElement,
      camera,
      sizesController
    );
    for (let i = 0; i < items3D.length; i++) {
      this._itemsMeshes.push(items3D[i].mesh);
    }
    canvas.addEventListener("pointermove", (event) => {
      this._pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      this._pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
    });

    canvas.addEventListener("click", () => {
      this._pick();
    });
  }

  private _pick() {
    this._kill = false;
    if (
      this._intersects.length === 0 ||
      (this._popup.trackedObject &&
        this._popup.trackedObject != this._intersects[0])
    ) {
      this._popup.trackedObject = null;
      this._popup.hide();
      return;
    }
    this._popup.trackedObject = this._intersects[0];
    setTimeout(() => {
      this._kill = true;
    }, 15);
  }

  public update() {
    this._raycaster.setFromCamera(this._pointer, this._camera);
    this._intersects = this._raycaster.intersectObjects(this._itemsMeshes);
    this._popup.update();
  }

  get intersects(): THREE.Intersection<THREE.Object3D<THREE.Event>>[] {
    return this._intersects;
  }

  get kill(): boolean {
    return this._kill;
  }
}
