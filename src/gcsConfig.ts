import * as storage from '@google-cloud/storage';
import path from 'path';
import { format } from 'util';

const authkey = path.join(__dirname, '../shckeys.json')
const gc = new storage.Storage({
    keyFilename: authkey,
    projectId: 'shopifychallenge-288608',
});

export const bucket = gc.bucket('img-repo');

export const uploadImage = (file) => new Promise((resolve) => {
    const { buffer } = file
    console.log(file);
    // set name and structure for file
    const fn = path.parse(file.originalname).name;
    const blob = bucket.file(fn);
    const blobStream = blob.createWriteStream({
      resumable: true,
      contentType: file.mimetype,
      predefinedAcl: 'publicRead',
    })
    blobStream.on('finish', () => {
      const publicUrl = format(
        `https://storage.googleapis.com/${bucket.name}/${blob.name}`
      )
      resolve(publicUrl)
    })
    .on('error', err => {
    console.log(err);
    })
    .end(buffer)
})