import express, { Request, Response } from "express";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send(
    "Typescript server is running and it is actually typescript this time!!!"
  );
});

export default app;
