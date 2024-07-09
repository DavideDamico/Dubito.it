import express, { Request, Response } from "express";
import { App } from "./App";

const app = express();
const server = express.json();
const myApp = new App();

app.use(server);

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
  if (tokenUser) return res.status(200).json({ token: tokenUser });
  else return res.status(400).json({ message: "invalid credentials" });
});

app.post("/api/auth/logout", function (req: Request, res: Response) {
  const referenceKeyUser = req.body.referenceKeyUser;
  const token = req.body.token;
  const success = myApp.logout(referenceKeyUser, token);
  if (success)
    return res.status(200).json({ message: "Logout successfully done" });
  else return res.status(400).json({ message: "Non-existent Token" });
});

app.post("/api/ads", function (req: Request, res: Response) {
  const token = req.body.token;
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
  const success = myApp.createAd(
    token,
    title,
    description,
    category,
    status,
    price,
    address,
    phone,
    urlPhoto
  );
  if (success)
    return res.status(200).json({ message: "Ad successfully created" });
  else return res.status(400).json({ message: "Authentication failed" });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
