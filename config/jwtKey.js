"use strict";
exports.__esModule = true;
exports.publicKey = exports.privateKey = void 0;
var fs = require("fs");
exports.privateKey = fs.readFileSync('config/testPrivate.pem').toString();
exports.publicKey = fs.readFileSync('config/testPublic.pem').toString();
