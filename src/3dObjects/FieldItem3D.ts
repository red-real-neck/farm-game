import * as THREE from "three";
import { FieldItem } from "../Entities/FieldItem";
import { Resources, ResourceUnit } from "../Entities/Units/ResourceUnit";
import { Unit3DFabric } from "../Fabric/Unit3DFabric";
import { Loader } from "../Loader/Loader";
import { BlockTextures, TextureStates } from "./Field3D";

export class FieldItem3D {
  private _textureCube: THREE.MeshBasicMaterial[];
  private _geometry: THREE.BoxGeometry;
  private _mesh: THREE.Mesh;
  private _textures: TextureStates;
  private _unit3DInstance: THREE.Group;

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
        this._unit3DInstance = Unit3DFabric.Instance.wheat;
        this._showUnit3DInstance();
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
  private _showUnit3DInstance() {
    this._mesh.add(this._unit3DInstance);
    console.log("this._unit3DInstance:", this._unit3DInstance);
  }

  get mesh(): THREE.Mesh {
    return this._mesh;
  }
}
