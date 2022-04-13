"use strict";
exports.__esModule = true;
exports.createSession = void 0;
var crypto = require("crypto");
var config_1 = require("../config/config");
function createSession(user_id, expire) {
    var mac = crypto.createHash('sha512');
    var hmac = mac.update("".concat(config_1.config.saltwebtokenv1, "/").concat(user_id, "/").concat(expire));
    var hash = hmac.digest('hex');
    return hash;
}
exports.createSession = createSession;
