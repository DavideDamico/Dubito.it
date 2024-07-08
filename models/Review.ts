import { ModelAd } from "./Ad";
import { ModelUser } from "./User";

export class ModelReview {
  primaryKey: number;
  referenceKeyUser: ModelUser["primaryKey"];
  referenceKeyAd: ModelAd["primaryKey"];
  title: string;
  description: string;
  rating: number;
  date: Date;
  constructor(
    referenceKeyUser: ModelUser["primaryKey"],
    referenceKeyAd: ModelAd["primaryKey"],
    title: string,
    description: string,
    rating: number
  ) {
    this.primaryKey = Math.random();
    this.referenceKeyUser = referenceKeyUser;
    this.referenceKeyAd = referenceKeyAd;
    this.title = title;
    this.description = description;
    this.rating = rating;
    this.date = new Date();
  }
}
