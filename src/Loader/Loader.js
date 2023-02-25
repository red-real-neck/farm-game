import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";

export class Loader {
  static load(path, scene) {
    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("./draco/");
    dracoLoader.preload();
    loader.setDRACOLoader(dracoLoader);
    let model;
    loader.load(
      path,
      function (glb) {
        model = glb;
        model.scene.position.y += 1.2;
        model.scene.scale.set(15, 15, 15);
        scene.add(model.scene);
      },
      function (xhr) {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      function (error) {
        console.log("error:", error);
        console.log("An error happened");
      }
    );
  }
}
