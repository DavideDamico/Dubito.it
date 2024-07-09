import express, { Request, Response } from "express";

const routerUsers = express.Router();

routerUsers.get("/", (req: Request, res: Response) => {
  return res.send("Hello World!");
});

export { routerUsers };
