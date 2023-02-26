import * as THREE from "three";
import { FieldItem3D } from "../3dObjects/FieldItem3D";
import { Resources } from "../Entities/Units/ResourceUnit";
import { AudioController } from "./AudioController";
import { Popup } from "./Popup";
import {
  ScreenSizes,
  ScreenSizesController,
} from "./ScreenSizesController/ScreenSizesController";

export class Picker3D {
  readonly DRAG_DELAY = 100;

  private _raycaster: THREE.Raycaster;
  private _pointer: THREE.Vector2;
  private _camera: THREE.Camera;
  private _itemsMeshes: THREE.Mesh[] = [];
  private _intersects: THREE.Intersection<THREE.Object3D<THREE.Event>>[] = [];
  private _popup: Popup;
  private _memo;
  private _drag: boolean = false;
  private timer: NodeJS.Timeout | null = null;

  private _kill: boolean = false;
  private mouseDown: boolean;

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

    canvas.addEventListener("mousedown", () => {
      this.mouseDown = true;
      this._drag = false;
    });

    canvas.addEventListener("mousemove", () => {
      if (!this.mouseDown) return;
      this.timer = setTimeout(() => this.onTimer(), this.DRAG_DELAY);
    });

    canvas.addEventListener("mouseup", () => {
      this.mouseDown = false;
      if (this._drag) return;
      this._pick();
    });
  }

  onTimer() {
    this.timer = null;
    this._drag = true;
  }

  private _pick() {
    AudioController.getInstance().playSound("click");
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

    if (this._intersects[0].object.userData.itemEntity.food) {
      this._intersects[0].object.userData.itemEntity.collectFood();
      return;
    }

    if (
      this._intersects[0].object.userData.itemEntity.resourceType &&
      this._intersects[0].object.userData.itemEntity.resourceType !=
        Resources.WHEAT
    ) {
      this._popup.toggleToFeed();
    } else if (
      this._intersects[0].object.userData.itemEntity.resourceType ===
      Resources.WHEAT
    ) {
      return;
    } else {
      this._popup.toggleToBar();
    }
    this._popup.trackedObject = this._intersects[0];
    setTimeout(() => {
      this._kill = true;
    }, 15);
  }

  public update() {
    if (!this._popup.trackedObject) this._kill = false;
    this._raycaster.setFromCamera(this._pointer, this._camera);

    if (
      this._raycaster.intersectObjects(this._itemsMeshes).length > 0 &&
      !this._kill
    ) {
      const currentMesh = this._raycaster.intersectObjects(this._itemsMeshes)[0]
        .object;
      if (this._intersects && this._memo != currentMesh) {
        AudioController.getInstance().playSound("dirt");
      }
    }

    this._intersects = this._raycaster.intersectObjects(this._itemsMeshes);
    this._memo = this._intersects[0]?.object;

    this._popup.update();
  }

  get intersects(): THREE.Intersection<THREE.Object3D<THREE.Event>>[] {
    return this._intersects;
  }

  get kill(): boolean {
    return this._kill;
  }
}
