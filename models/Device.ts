import { ModelUser } from "./User";

export class ModelDevice {
  primaryKey: number;
  referenceKeyUser: ModelUser["primaryKey"];
  idDevice: number;
  deviceName: string | number;

  constructor(referenceKeyUser: ModelUser["primaryKey"], device: number) {
    this.primaryKey = Math.random();
    this.referenceKeyUser = referenceKeyUser;
    this.idDevice = device;
    this.deviceName = device;
  }
}
