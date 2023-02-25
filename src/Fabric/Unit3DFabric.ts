import * as THREE from "three";
import { Resources } from "../Entities/Units/ResourceUnit";
import { Loader } from "../Loader/Loader";

export class Unit3DFabric {
  // _model = Loader.load("./models/chicken.glb", this._mesh);
  private static _instance: Unit3DFabric;
  private _chicken: THREE.Group = new THREE.Group();
  private _wheat: THREE.Group = new THREE.Group();
  private _cow: THREE.Group = new THREE.Group();
  private _egg: THREE.Group = new THREE.Group();
  private _milk: THREE.Group = new THREE.Group();

  private constructor() {
    Loader.load("./models/chicken.glb", this._chicken, Resources.CHICKEN);
    Loader.load("./models/wheat.glb", this._wheat, Resources.WHEAT);
    Loader.load("./models/cow.glb", this._cow, Resources.COW);
    Loader.load("./models/egg.glb", this._egg, Resources.EGG);
    Loader.load("./models/milk.glb", this._milk, Resources.MILK);
  }

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  get chicken() {
    const newChicken = this._chicken.clone();
    return newChicken;
  }

  get wheat() {
    const newWheat = this._wheat.clone();
    return newWheat;
  }

  get cow() {
    const newCow = this._cow.clone();
    return newCow;
  }

  get egg() {
    const newEgg = this._egg.clone();
    return newEgg;
  }

  get milk() {
    const newMilk = this._milk.clone();
    return newMilk;
  }
}
