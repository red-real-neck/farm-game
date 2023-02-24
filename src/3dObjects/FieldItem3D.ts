import * as THREE from "three";
import { BlockTextures } from "./Field3D";

export class FieldItem3D {
  private _textureCube: THREE.MeshBasicMaterial[];
  private _geometry: THREE.BoxGeometry;
  private _mesh: THREE.Mesh;

  constructor(
    fieldHeight: number,
    fieldWidth: number,
    index: number,
    textures: BlockTextures
  ) {
    this._geometry = new THREE.BoxGeometry(1, 1, 1);
    this._textureCube = [
      new THREE.MeshBasicMaterial({
        map: textures.side,
      }),
      new THREE.MeshBasicMaterial({
        map: textures.side,
      }),
      new THREE.MeshBasicMaterial({
        map: textures.top,
      }),
      new THREE.MeshBasicMaterial({
        map: textures.side,
      }),
      new THREE.MeshBasicMaterial({
        map: textures.side,
      }),
      new THREE.MeshBasicMaterial({
        map: textures.side,
      }),
    ];
    this._generateItem3D(fieldHeight, fieldWidth, index);
  }

  private _generateItem3D(
    fieldHeight: number,
    fieldWidth: number,
    index: number
  ): void {
    this._mesh = new THREE.Mesh(this._geometry, this._textureCube);
    this._mesh.position.x = (index % 8) - fieldWidth / 2 + 0.5;
    this._mesh.position.z = Math.floor(index / 8) - fieldHeight / 2 + 0.5;
  }

  get mesh(): THREE.Mesh {
    return this._mesh;
  }
}
