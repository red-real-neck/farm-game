import * as THREE from "three";
import { AnimationController } from "../Controllers/AnimationController";

import PerspectiveCameraController from "../Controllers/CameraController/PerspectiveCameraController";
import { ControlsController } from "../Controllers/ControlsController/ControlsController";
import { Picker3D } from "../Controllers/Picker";
import { RendererController } from "../Controllers/RendererController/RendererController";
import { ScreenSizesController } from "../Controllers/ScreenSizesController/ScreenSizesController";
import { Field } from "../Entities/Filed";

export default class App {
  private _canvas: HTMLCanvasElement;
  constructor() {}

  init() {
    /**
     * Base
     */
    // Canvas
    this._canvas = document.querySelector("canvas.webgl")!;

    // Scene
    const scene = new THREE.Scene();

    /**
     * Object
     */
    // Define the material and geometry for each square
    const textureLoader = new THREE.TextureLoader();
    const grassSideTex = textureLoader.load("./grass-side.jpg");
    const grassTopTex = textureLoader.load("./grass-top.jpg");
    const field = new Field(8, 8, {
      side: grassSideTex,
      top: grassTopTex,
    });

    scene.add(field.group3D);

    /**
     * Sizes
     */
    const sizesController = new ScreenSizesController(this._canvas);
    sizesController.init();

    /**
     * Camera
     */
    const cameraController = new PerspectiveCameraController(
      scene,
      sizesController
    );
    cameraController.camera.position.x = -5;
    cameraController.camera.position.z = 10;
    cameraController.camera.position.y = 8;
    scene.add(cameraController.camera);

    /**
     * Picker
     */
    const picker = new Picker3D(cameraController.camera, field.items3D);

    // Controls
    const controlsController = new ControlsController(
      cameraController.camera,
      this._canvas
    );

    /**
     * Renderer
     */
    const rendererController = new RendererController(
      this._canvas,
      sizesController
    );

    sizesController.setControllers(cameraController, rendererController);

    /**
     * Animate
     */
    const clock = new THREE.Clock();
    const aimationController = new AnimationController();

    const tick = () => {
      const elapsedTime = clock.getElapsedTime();
      const deltaTime = clock.getDelta();
      // console.log("elapsedTime:", elapsedTime);

      picker.update();
      if (picker.intersects) {
        aimationController.animate(picker.intersects, deltaTime);
      }

      // Update controls
      controlsController.controls.update();

      // Render
      rendererController.renderer.render(scene, cameraController.camera);

      // Call tick again on the next frame
      window.requestAnimationFrame(tick);
    };

    tick();
  }
}
