import { ModelAd } from "./Ad";
import { ModelUser } from "./User";

export class ModelReport {
  primaryKey: number;
  referenceKeyUser: ModelUser["primaryKey"];
  referenceKeyAd: ModelAd["primaryKey"];
  title: string;
  description: string;
  status: string;
  constructor(
    referenceKeyUser: ModelUser["primaryKey"],
    referenceKeyAd: ModelAd["primaryKey"],
    title: string,
    description: string,
    status: string
  ) {
    this.primaryKey = Math.random();
    this.referenceKeyUser = referenceKeyUser;
    this.referenceKeyAd = referenceKeyAd;
    this.title = title;
    this.description = description;
    this.status = status;
  }
}
