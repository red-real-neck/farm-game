import * as THREE from "three";
import { FieldItem } from "../Entities/FieldItem";
import { Food, FoodType } from "../Entities/Foods/Food";
import { Resources, ResourceUnit } from "../Entities/Units/ResourceUnit";
import { Unit3DFabric } from "../Fabric/Unit3DFabric";
import { Loader } from "../Loader/Loader";
import { BlockTextures, TextureStates } from "./Field3D";

export class FieldItem3D {
  private _textureCube: THREE.MeshBasicMaterial[];
  private _geometry: THREE.BoxGeometry;
  private _mesh: THREE.Mesh;
  private _textures: TextureStates;
  private _unit3DInstance: THREE.Group | null;
  private _food3DInstance: THREE.Group | null;

  constructor(
    fieldHeight: number,
    fieldWidth: number,
    index: number,
    textures: TextureStates,
    itemEntity: FieldItem
  ) {
    this._geometry = new THREE.BoxGeometry(1, 1, 1);
    this._textures = textures;

    this._textureCube = [
      new THREE.MeshBasicMaterial({
        map: this._textures.default.side,
      }),
      new THREE.MeshBasicMaterial({
        map: this._textures.default.side,
      }),
      new THREE.MeshBasicMaterial({
        map: this._textures.default.top,
      }),
      new THREE.MeshBasicMaterial({
        map: this._textures.default.side,
      }),
      new THREE.MeshBasicMaterial({
        map: this._textures.default.side,
      }),
      new THREE.MeshBasicMaterial({
        map: this._textures.default.side,
      }),
    ];

    this._generateItem3D(fieldHeight, fieldWidth, index, itemEntity);
  }

  private _generateItem3D(
    fieldHeight: number,
    fieldWidth: number,
    index: number,
    itemEntity: FieldItem
  ): void {
    this._mesh = new THREE.Mesh(this._geometry, this._textureCube);
    this._mesh.userData = {
      itemEntity: itemEntity,
    };
    this._mesh.position.x = (index % 8) - fieldWidth / 2 + 0.5;
    this._mesh.position.z = Math.floor(index / 8) - fieldHeight / 2 + 0.5;
  }

  public update(resourceUnit: ResourceUnit) {
    switch (resourceUnit.unit) {
      case Resources.WHEAT:
        for (let i = 0; i < this._textureCube.length; i++) {
          this._textureCube[i].map = this._textures.plowed.side;
          this._textureCube[i].needsUpdate = true;
        }
        break;
      case Resources.CHICKEN:
        this._unit3DInstance = Unit3DFabric.Instance.chicken;
        this._showUnit3DInstance();
        break;
      case Resources.COW:
        this._unit3DInstance = Unit3DFabric.Instance.cow;
        this._showUnit3DInstance();
        break;
      case Resources.WHEAT:
    }
  }

  public showFood(food: Food) {
    console.log("food3d:", food.type);
    switch (food.type) {
      case FoodType.WHEAT:
        this._food3DInstance = Unit3DFabric.Instance.wheat;
        break;
      case FoodType.EGG:
        this._food3DInstance = Unit3DFabric.Instance.egg;
        break;
      case FoodType.MILK:
        this._food3DInstance = Unit3DFabric.Instance.milk;
        break;
    }
    this._showFood3DInstance();
  }

  public destroyFood() {
    this._mesh.remove(this._food3DInstance!);
    this._food3DInstance = null;
  }

  private _showUnit3DInstance() {
    this._mesh.add(this._unit3DInstance!);
  }

  private _showFood3DInstance() {
    this._mesh.add(this._food3DInstance!);
    console.log("this._food3DInstance:", this._food3DInstance);
  }

  get mesh(): THREE.Mesh {
    return this._mesh;
  }
}
