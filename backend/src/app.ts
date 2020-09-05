import express from 'express';
import cors from 'cors';
import router from './router';
import bodyparser from 'body-parser';
import multer from 'multer';

const multerConf = multer({
    storage: multer.memoryStorage(),
    limits: {
      fileSize: 10 * 1024 * 1024,
    },
  })
class App {
    public app: express.Application;
    private setConfig(): void{
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(bodyparser.json());
        this.app.use(bodyparser.urlencoded({extended: false}));
        this.app.use(multerConf.single('file'));
    }
    constructor(){
        this.app = express();
        this.setConfig();
        router(this.app);
    }
}

export default new App().app;