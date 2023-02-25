import { Food, FoodType } from "../Entities/Foods/Food";

export class FoodCollector {
  private static instance: FoodCollector;
  private EGG: number = 0;
  private MILK: number = 0;
  private WHEAT: number = 0;

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

    console.log("this.EGG:", this.EGG);
    console.log("this.MILK:", this.MILK);
    console.log("this.WHEAT:", this.WHEAT);
  }
}
