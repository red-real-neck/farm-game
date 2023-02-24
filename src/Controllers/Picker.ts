import * as THREE from "three";
import { FieldItem3D } from "../3dObjects/FieldItem3D";

export class Picker3D {
  private _raycaster: THREE.Raycaster;
  private _pointer: THREE.Vector2;
  private _camera: THREE.Camera;
  private _itemsMeshes: THREE.Mesh[] = [];
  private _intersects: THREE.Intersection<THREE.Object3D<THREE.Event>>[] = [];

  constructor(camera: THREE.Camera, items3D: FieldItem3D[]) {
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

  private _pick() {}

  public update() {
    this._raycaster.setFromCamera(this._pointer, this._camera);
    this._intersects = this._raycaster.intersectObjects(this._itemsMeshes);
  }

  get intersects(): THREE.Intersection<THREE.Object3D<THREE.Event>>[] {
    return this._intersects;
  }
}
