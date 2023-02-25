import { Food, FoodType } from "../Entities/Foods/Food";
import { Resources } from "../Entities/Units/ResourceUnit";

export class FoodCollector {
  private static instance: FoodCollector;
  private EGG: number = 0;
  private MILK: number = 0;
  private WHEAT: number = 5;

  private wheatCounterUI: HTMLElement;
  private eggCounterUI: HTMLElement;
  private milkCounterUI: HTMLElement;

  private constructor() {
    this.wheatCounterUI = document.querySelector("#wheat-counter")!;
    this.eggCounterUI = document.querySelector("#egg-counter")!;
    this.milkCounterUI = document.querySelector("#milk-counter")!;
    this.updateUI();
  }

  static getInstance(): FoodCollector {
    if (!FoodCollector.instance) {
      FoodCollector.instance = new FoodCollector();
    }
    return FoodCollector.instance;
  }

  public addItem(item: Food) {
    this[item.type]++;
    if (item.type === FoodType.WHEAT) this[item.type]++;
    this.updateUI();
  }

  public subItem(item: Resources) {
    this[item]--;
    this.updateUI();
  }

  private updateUI() {
    this.wheatCounterUI.innerText = this.WHEAT.toString();
    this.eggCounterUI.innerText = this.EGG.toString();
    this.milkCounterUI.innerText = this.MILK.toString();
  }
}
