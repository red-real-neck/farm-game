import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

export class ControlsController {
  controls;

  constructor(camera, canvas) {
    this.controls = new OrbitControls(camera, canvas);
    this.controls.enableDamping = true;
    this.initGameCameraSetting();
  }

  initGameCameraSetting() {
    this.controls.zoomSpeed = 0.3;
    this.controls.rotateSpeed = 0.3;
    this.controls.enablePan = false;
    this.controls.maxDistance = 18;
    this.controls.minDistance = 12.5;
    this.controls.minPolarAngle = Math.PI / 6;
    this.controls.maxPolarAngle = Math.PI / 3;
    this.controls.minAzimuthAngle = -Math.PI / 2;
    this.controls.maxAzimuthAngle = Math.PI / 2;
  }
}
