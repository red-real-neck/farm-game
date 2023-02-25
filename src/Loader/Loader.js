import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";

const CHICKEN_SCALE = 10;
const COW_SCALE = 0.2;
const WHEAT_SCALE = 0.005;

export class Loader {
  static load(path, scene, unitName) {
    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("./draco/");
    dracoLoader.preload();
    loader.setDRACOLoader(dracoLoader);
    loader.load(
      path,
      function (glb) {
        glb.scene.position.y += 1;
        switch (unitName) {
          case "CHICKEN":
            glb.scene.scale.set(CHICKEN_SCALE, CHICKEN_SCALE, CHICKEN_SCALE);
            break;
          case "COW":
            glb.scene.scale.set(COW_SCALE, COW_SCALE, COW_SCALE);
            glb.scene.position.z += 0.4;
            break;
          case "WHEAT":
            glb.scene.scale.set(WHEAT_SCALE, WHEAT_SCALE, WHEAT_SCALE);
            glb.scene.position.y -= 0.2;
            break;
        }
        scene.add(glb.scene);
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
