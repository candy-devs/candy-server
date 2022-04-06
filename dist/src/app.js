"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("./models/user");
const routes_1 = require("./routes/routes");
const PORT = parseInt(process.env.PORT) || 8864;
const HOST = process.env.HOST || "localhost";
const app = (0, express_1.default)();
app.use(routes_1.routes);
app.listen(PORT, HOST, () => {
    console.log(`server start ${HOST}:${PORT}`);
});
user_1.User.sync({ force: true });
