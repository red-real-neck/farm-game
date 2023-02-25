import { Food, FoodType } from "../Entities/Foods/Food";

export class FoodCollector {
  private static instance: FoodCollector;
  private EGG: number = 0;
  private MILK: number = 0;
  private WHEAT: number = 5;

  private constructor() {}

  static getInstance(): FoodCollector {
    if (!FoodCollector.instance) {
      FoodCollector.instance = new FoodCollector();
    }
    return FoodCollector.instance;
  }

  public addItem(item: Food) {
    this[item.type]++;
    if (item.type === FoodType.WHEAT) this[item.type]++;
    // this.updateUI();
  }
}
