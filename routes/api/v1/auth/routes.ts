import express, { Request, Response, NextFunction } from "express";
import * as signin from  "./signin";

const router = express.Router();

router.use(signin.routes);

export const routes = router;