import * as THREE from "three";
import { FieldItem } from "../Entities/FieldItem";
import { FieldItem3D } from "./FieldItem3D";

export type BlockTextures = {
  side: THREE.Texture;
  top: THREE.Texture;
};

export type TextureStates = {
  default: BlockTextures;
  plowed: BlockTextures;
};
export class Field3D {
  private _group3D: THREE.Group;
  private _fieldHeight: number;
  private _fieldWidth: number;
  private _items3D: FieldItem3D[] = [];

  constructor(
    fieldHeight: number,
    fieldWidth: number,
    items: FieldItem[],
    textures: TextureStates
  ) {
    this._group3D = new THREE.Group();
    this._fieldHeight = fieldHeight;
    this._fieldWidth = fieldWidth;
    this._generateField(items, textures);
  }

  private _generateField(items: FieldItem[], textures: TextureStates) {
    for (let i = 0; i < items.length; i++) {
      const item3D = items[i].createItem3D(
        this._fieldHeight,
        this._fieldWidth,
        i,
        textures
      );
      this._items3D.push(item3D);
      this._group3D.add(item3D.mesh);
    }
  }

  get group3D(): THREE.Group {
    return this._group3D;
  }

  get items3D(): FieldItem3D[] {
    return this._items3D;
  }
}
