import gsap from "gsap";
import { Object3D } from "three";

export class AnimationController {
  private _memo: Object3D<THREE.Event>;
  private _ANIMATION_DURATION: number = 0.5;
  animate(
    intersects: THREE.Intersection<THREE.Object3D<THREE.Event>>[],
    deltaTime: number
  ): void {
    if (intersects.length === 0 && !this._memo) return;
    if (
      this._memo &&
      (intersects.length === 0 || intersects[0].object != this._memo)
    )
      gsap.to(this._memo.position, {
        duration: this._ANIMATION_DURATION,
        y: 0,
      });
    if (intersects.length === 0) return;

    this._memo = intersects[0].object;

    gsap.to(intersects[0].object.position, {
      duration: this._ANIMATION_DURATION,
      y: 0.5,
    });
    // console.log("intersects[0]:", intersects[0]);
  }
}
