import express from 'express';

export default function router(app: express.Application): void {
  app.route("/").get((req: express.Request, res: express.Response) => {
    res.send("Started");
  });
}