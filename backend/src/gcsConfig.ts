import * as storage from '@google-cloud/storage';
import path from 'path';
import mime from 'mime-types';
import { format } from 'util';

const authkey = path.join(__dirname, './shckeys.json')
const gc = new storage.Storage({
    keyFilename: authkey,
    projectId: 'shopifychallenge-288608',
});
const bucket = gc.bucket('img-repo');

export const uploadImage = (file) => new Promise((resolve, reject) => {
    const { originalname, buffer } = file
    const type = mime.lookup(file.originalname);
    // set name and structure for file
    const blob = bucket.file(``);
    const blobStream = blob.createWriteStream({
        resumable: true,
		contentType: type,
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