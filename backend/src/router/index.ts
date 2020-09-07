import express from 'express';
import {bucket, uploadImage} from '../gcsConfig';
import multer from 'multer';

const Multer = multer({
    storage: multer.memoryStorage(),
    limits: {
      fileSize: 10 * 1024 * 1024,
    },
  })

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
      const f = bucket.file(`${imageId}`);
      const meta = await f.getMetadata();
      const type = meta[0].contentType.split('/')[1];
      const save = f.createReadStream();
      res.writeHead(200, {'Content-disposition': `attachment; filename=${imageId}.${type}`});
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

    app.get('/search/:id', async (req:  express.Request, res: express.Response) => {
      const searchId: string = req.params.id;
      const [files] = await bucket.getFiles({ prefix: `${searchId}`});
      let fa: string = "";
      files.forEach(file => {
        fa += file.name + ", ";
      })
      res
      .send(
        "Found these Images: " + fa
      )
    });

}