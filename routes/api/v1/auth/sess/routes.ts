import express, { Request, Response, NextFunction } from "express";
import * as request from "./request";

const router = express.Router();

router.use('/request', request.routes);

export const routes = router;