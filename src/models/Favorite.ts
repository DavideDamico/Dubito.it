import { ModelAd } from "./Ad";
import { ModelUser } from "./User";

export class ModelFavorite {
  primaryKey: number;
  referenceKeyUser: ModelUser["primaryKey"];
  referenceKeyAd: ModelAd["primaryKey"];
  constructor(
    referenceKeyUser: ModelUser["primaryKey"],
    referenceKeyAd: ModelAd["primaryKey"]
  ) {
    this.primaryKey = Math.random();
    this.referenceKeyUser = referenceKeyUser;
    this.referenceKeyAd = referenceKeyAd;
  }
}
