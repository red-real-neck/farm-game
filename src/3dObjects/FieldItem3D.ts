import * as THREE from "three";
import { FieldItem } from "../Entities/FieldItem";
import { Resources, ResourceUnit } from "../Entities/Units/ResourceUnit";
import { Loader } from "../Loader/Loader";
import { BlockTextures, TextureStates } from "./Field3D";

export class FieldItem3D {
  private _textureCube: THREE.MeshBasicMaterial[];
  private _geometry: THREE.BoxGeometry;
  private _mesh: THREE.Mesh;
  private _textures: TextureStates;

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
        const model = Loader.load("./models/chicken.glb", this._mesh);
    }
  }

  get mesh(): THREE.Mesh {
    return this._mesh;
  }
}
