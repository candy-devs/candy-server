import * as fs from 'fs';

export const privateKey = fs.readFileSync('testPrivate.pem').toString();
export const publicKey = fs.readFileSync('testPublic.pem').toString();