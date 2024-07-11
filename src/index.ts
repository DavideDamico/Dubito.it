import express, { Request, Response } from "express";
import { App } from "./App";

const app = express();
const server = express.json();
const myApp = new App();

app.use(server);

app.get("/api/users", function (req: Request, res: Response) {
  const usersList = myApp.getUsersList();
  return res.status(200).json(usersList);
});

app.get("/api/reviews", function (req: Request, res: Response) {
  const reviewsList = myApp.getReviewsList();
  return res.status(200).json(reviewsList);
});

app.get("/api/reports", function (req: Request, res: Response) {
  const reportsList = myApp.getReportsList();
  return res.status(200).json(reportsList);
});

app.get("/api/favorites", function (req: Request, res: Response) {
  const favoritesList = myApp.getFavoritesList();
  return res.status(200).json(favoritesList);
});

app.get("/api/devices", function (req: Request, res: Response) {
  const devicesList = myApp.getDevicesList();
  return res.status(200).json(devicesList);
});

app.get("/api/auths", function (req: Request, res: Response) {
  const authsList = myApp.getAuthsList();
  return res.status(200).json(authsList);
});

app.get("/api/ads", function (req: Request, res: Response) {
  const adsList = myApp.getAdsList();
  return res.status(200).json(adsList);
});

app.post("/api/auth/register", function (req: Request, res: Response) {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  if (!username) return res.status(400).json({ message: "username required" });
  if (!email) return res.status(400).json({ message: "email required" });
  if (!password) return res.status(400).json({ message: "password required" });
  const success = myApp.register(username, email, password);
  if (success) return res.status(200).json({ message: myApp.getUsersList() });
  else return res.status(400).json({ message: "account already exist" });
});

app.post("/api/auth/login", function (req: Request, res: Response) {
  const username = req.body.username;
  const password = req.body.password;
  if (!username) return res.status(400).json({ message: "username required" });
  if (!password) return res.status(400).json({ message: "password required" });
  const tokenUser = myApp.login(username, password);
  if (!!tokenUser) return res.status(200).json({ token: tokenUser });
  else return res.status(400).json({ message: "invalid credentials" });
});

app.get("/api/auth/logout", function (req: Request, res: Response) {
  const token = req.headers.authorization;
  const success = myApp.logout(Number(token));
  if (!!success)
    return res.status(200).json({ message: "Logout successfully done" });
  else return res.status(400).json({ message: "Non-existent Token" });
});

app.post("/api/ads", function (req: Request, res: Response) {
  const token = req.headers.authorization;
  const title = req.body.title;
  const description = req.body.description;
  const category = req.body.category;
  const status = req.body.status;
  const price = req.body.price;
  const address = req.body.address;
  const phone = req.body.phone;
  const urlPhoto = req.body.urlPhoto;
  if (!token) return res.status(400).json({ message: "token required" });
  if (!title) return res.status(400).json({ message: "title required" });
  if (!description)
    return res.status(400).json({ message: "description required" });
  if (!category) return res.status(400).json({ message: "category required" });
  if (!status) return res.status(400).json({ message: "status required" });
  if (!price) return res.status(400).json({ message: "price required" });
  if (!address) return res.status(400).json({ message: "address required" });
  if (!phone) return res.status(400).json({ message: "phone required" });
  if (!urlPhoto) return res.status(400).json({ message: "urlPhoto required" });
  const adCreation = myApp.createAd(
    Number(token),
    title,
    description,
    category,
    status,
    price,
    address,
    phone,
    urlPhoto
  );
  if (!!adCreation) return res.status(200).json({ ad: adCreation });
  else return res.status(400).json({ message: "Authentication failed" });
});

app.put("/api/ads/:primaryKey", function (req: Request, res: Response) {
  const token = req.headers.authorization;
  const referenceKeyAd = req.body.primaryKey;
  const title = req.body.title;
  const description = req.body.description;
  const category = req.body.category;
  const status = req.body.status;
  const price = req.body.price;
  const address = req.body.address;
  const phone = req.body.phone;
  const urlPhoto = req.body.urlPhoto;
  if (!token) return res.status(400).json({ message: "token required" });
  if (!title) return res.status(400).json({ message: "title required" });
  if (!description)
    return res.status(400).json({ message: "description required" });
  if (!category)
    return res.status(41200).json({ message: "category required" });
  if (!status) return res.status(400).json({ message: "status required" });
  if (!price) return res.status(400).json({ message: "price required" });
  if (!address) return res.status(400).json({ message: "address required" });
  if (!phone) return res.status(400).json({ message: "phone required" });
  if (!urlPhoto) return res.status(400).json({ message: "urlPhoto required" });
  const adUpdated = myApp.updateAd(
    Number(token),
    referenceKeyAd,
    title,
    description,
    category,
    status,
    price,
    address,
    phone,
    urlPhoto
  );
  if (adUpdated) return res.status(200).json({ ad: adUpdated });
  else return res.status(400).json({ message: "Authentication failed" });
});

app.delete("/api/ads/:primaryKey", function (req: Request, res: Response) {
  const adDeleted = myApp.deleteAd(
    Number(req.headers.authorization),
    Number(req.params.primaryKey)
  );
  if (!!adDeleted)
    return res.status(200).json({ message: "Ad deleted successfully" });
  else return res.status(400).json({ message: "Authentication failed" });
});

app.post(
  "/api/reviews/:referenceKeyAd",
  function (req: Request, res: Response) {
    const token = req.headers.authorization;
    const referenceKeyAd = req.params.referenceKeyAd;
    const title = req.body.title;
    const description = req.body.description;
    const rating = req.body.rating;
    if (!token) return res.status(400).json({ message: "token required" });
    if (!title) return res.status(400).json({ message: "title required" });
    if (!description)
      return res.status(400).json({ message: "description required" });
    if (!rating) return res.status(400).json({ message: "rating required" });
    const reviewCreation = myApp.createReview(
      Number(req.headers.authorization),
      Number(referenceKeyAd),
      title,
      description,
      rating
    );
    if (!!reviewCreation) return res.status(200).json({ reviewCreation });
    else return res.status(400).json({ message: "Authentication failed" });
  }
);

app.put("/api/reviews/:referenceKeyAd", function (req: Request, res: Response) {
  const token = req.headers.authorization;
  const referenceKeyAd = req.params.referenceKeyAd;
  const title = req.body.title;
  const description = req.body.description;
  const rating = req.body.rating;
  if (!token) return res.status(400).json({ message: "token required" });
  if (!title) return res.status(400).json({ message: "title required" });
  if (!description)
    return res.status(400).json({ message: "description required" });
  if (!rating) return res.status(400).json({ message: "rating required" });
  const reviewUpdated = myApp.updateReview(
    Number(req.headers.authorization),
    Number(referenceKeyAd),
    title,
    description,
    rating
  );
  if (!!reviewUpdated) return res.status(200).json({ reviewUpdated });
  else return res.status(400).json({ message: "Authentication failed" });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
