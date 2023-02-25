import { Resources, ResourceUnit } from "./Units/ResourceUnit";
import { FieldItem3D } from "../3dObjects/FieldItem3D";
import { BlockTextures, TextureStates } from "../3dObjects/Field3D";
import { UnitFabric } from "../Fabric/UnitFabric";
import { UnitController } from "../Controllers/UnitController/UnitController";

export class FieldItem {
  private _item3D: FieldItem3D;
  private _resourceUnit: ResourceUnit | null = null;
  private _unitController: UnitController;

  createItem3D(
    fieldHeight: number,
    fieldWidth: number,
    i: number,
    textures: TextureStates
  ): FieldItem3D {
    this._item3D = new FieldItem3D(fieldHeight, fieldWidth, i, textures, this);
    return this._item3D;
  }

  public setUnit(unit: Resources) {
    this._resourceUnit = UnitFabric.createUnit(unit);
    this._item3D.update(this._resourceUnit);
    const unitController = new UnitController(this);
  }

  get resourceType() {
    return this._resourceUnit?.unit;
  }
}
