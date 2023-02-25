import App from "./App/App";
import { FoodCollector } from "./Collector/FoodCollector";
import { Unit3DFabric } from "./Fabric/Unit3DFabric";

Unit3DFabric.Instance;
FoodCollector.getInstance();

const app = new App();
app.init();
