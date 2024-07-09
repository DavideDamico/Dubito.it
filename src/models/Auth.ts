import { ModelUser } from "./User";

export class ModelAuth {
  primaryKey: number;
  token: number;
  referenceKeyUser: ModelUser["primaryKey"];
  constructor(referenceKeyUser: ModelUser["primaryKey"]) {
    this.primaryKey = Math.random();
    this.token = Math.random();
    this.referenceKeyUser = referenceKeyUser;
  }
}
