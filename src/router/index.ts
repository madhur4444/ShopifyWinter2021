import express from 'express';
import {uploadImage} from '../gcsConfig';
import * as storage from '@google-cloud/storage';
import path from 'path';
import multer from 'multer';

const Multer = multer({
    storage: multer.memoryStorage(),
    limits: {
      fileSize: 10 * 1024 * 1024,
    },
  })

const authkey = path.join(__dirname, '/../shckeys.json')
const gc = new storage.Storage({
    keyFilename: authkey,
    projectId: 'shopifychallenge-288608',
});
const bucket = gc.bucket('img-repo');

export default function router(app: express.Application): void {
  app.route("/").get((req: express.Request, res: express.Response) => {
    res.send("Started");
  });

  app.post("/upload", Multer.array('file'), async (req: express.Request, res: express.Response) => {
    let promises: Array<Promise<{}>> = [];
    try {
      (req as any).files.forEach((file) => {
        const imageUrl = uploadImage(file);
        promises.push(imageUrl);
      });

      Promise.all(promises)
      .then( () => {
        promises = []; 
      })
      .catch(console.error);

      res
        .status(200)
        .json({
          message: "Upload was successful",
        })
    } catch (error) {
     console.log(error);
    }});
  
  app.get('/download/:id', async (req:  express.Request, res: express.Response) => {
      const imageId: string = req.params.id;
      const save = bucket.file(`${imageId}.jpeg`).createReadStream();
      res.writeHead(200, {'Content-disposition': `attachment; filename=${imageId}.jpeg`});
      save.on('data', (data) => {
       res.write(data);
      })
      .on('finish', () => {
        res.end();
      })
      .on('error', err => {
      console.log(err);
      });
    });
}