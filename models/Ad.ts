import { ModelUser } from "./User";

export class ModelAd {
  primaryKey: number;
  date: Date;
  lead: [];
  referenceKeyUserPurchased: ModelUser["primaryKey"];
  referenceKeyUser: ModelUser["primaryKey"];
  title: string;
  description: string;
  category: string;
  status: string;
  price: number;
  address: string;
  phone: string;
  urlPhoto: string;
  constructor(
    referenceKeyUser: ModelUser["primaryKey"],
    title: string,
    description: string,
    category: string,
    status: string,
    price: number,
    address: string,
    phone: string,
    urlPhoto: string
  ) {
    this.primaryKey = Math.random();
    this.date = new Date();
    this.lead = [];
    this.referenceKeyUserPurchased = 0;
    this.referenceKeyUser = referenceKeyUser;
    this.title = title;
    this.description = description;
    this.category = category;
    this.status = status;
    this.price = price;
    this.address = address;
    this.phone = phone;
    this.urlPhoto = urlPhoto;
  }
}
