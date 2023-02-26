import App from "./App/App";
import { FoodCollector } from "./Collector/FoodCollector";
import { AudioController } from "./Controllers/AudioController";
import { Unit3DFabric } from "./Fabric/Unit3DFabric";

Unit3DFabric.Instance;
FoodCollector.getInstance();

const app = new App();
app.init();

const starter = document.querySelector(".starter");

const starterListener = starter?.addEventListener("click", (e) => {
  AudioController.getInstance().createContext();
  AudioController.getInstance().playSound("click");
  AudioController.getInstance().playSound("music");
  AudioController.getInstance().playSound("ambient");
  starter.classList.add("hidden");
});
