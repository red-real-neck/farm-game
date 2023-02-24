import { BlockTextures } from "../3dObjects/Field3D";
import { FieldItem3D } from "../3dObjects/FieldItem3D";

export class FieldItem {
  private _item3D: FieldItem3D;

  constructor(textures: BlockTextures) {}

  createItem3D(
    fieldHeight: number,
    fieldWidth: number,
    i: number,
    textures: BlockTextures
  ): FieldItem3D {
    this._item3D = new FieldItem3D(fieldHeight, fieldWidth, i, textures);
    return this._item3D;
  }
}
