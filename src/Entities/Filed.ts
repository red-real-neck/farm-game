import { BlockTextures, Field3D, TextureStates } from "../3dObjects/Field3D";
import { FieldItem3D } from "../3dObjects/FieldItem3D";
import { FieldItem } from "./FieldItem";

export class Field {
  private _fieldHeight: number;
  private _fieldWidth: number;
  private _field3D: Field3D;
  private _items: FieldItem[] = [];

  constructor(fieldHeight, fieldWidth, textures: TextureStates) {
    this._fieldHeight = fieldHeight;
    this._fieldWidth = fieldWidth;
    this._createItems(textures);
  }

  private _createItems(textures: TextureStates) {
    for (let i = 0; i < this._fieldHeight * this._fieldWidth; i++) {
      const filedItem = new FieldItem();
      this._items.push(filedItem);
    }
    this._generateField(textures);
  }

  private _generateField(textures: TextureStates) {
    this._field3D = new Field3D(
      this._fieldHeight,
      this._fieldWidth,
      this._items,
      textures
    );
  }

  get group3D(): THREE.Group {
    return this._field3D.group3D;
  }

  get items3D(): FieldItem3D[] {
    return this._field3D.items3D;
  }
}
