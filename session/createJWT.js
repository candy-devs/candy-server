"use strict";
exports.__esModule = true;
exports.createJWT = void 0;
var jwt = require("jsonwebtoken");
var config_1 = require("../config/config");
var jwtKey_1 = require("../config/jwtKey");
function createJWT(user_id) {
    var payload = {
        id: user_id
    };
    var refreshTokenOptions = {
        algorithm: "RS256",
        expiresIn: "14d",
        issuer: config_1.config.issuer
    };
    var accessTokenOptions = {
        algorithm: "RS256",
        expiresIn: "2h",
        issuer: config_1.config.issuer
    };
    var refreshToken = jwt.sign(payload, jwtKey_1.privateKey, refreshTokenOptions);
    var accessToken = jwt.sign(payload, jwtKey_1.privateKey, accessTokenOptions);
    return 'jwt-' + JSON.stringify({
        refreshToken: refreshToken,
        accessToken: accessToken
    });
}
exports.createJWT = createJWT;
