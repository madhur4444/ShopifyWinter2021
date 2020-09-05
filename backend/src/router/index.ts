import express from 'express';
import {uploadImage} from '../gcsConfig';


export default function router(app: express.Application): void {
  app.route("/").get((req: express.Request, res: express.Response) => {
    res.send("Started");
  });

  app.post("/upload", async (req, res) => {
    try {
      const myFile = (req as any).file;
      const imageUrl = await uploadImage(myFile);
  
      res
        .status(200)
        .json({
          message: "Upload was successful",
          data: imageUrl
        })
    } catch (error) {
     console.log(error);
    }});
}