import express, { Request, Response, NextFunction } from "express";
import * as read from "./read";
import * as write from  "./write";

const router = express.Router();

router.use(read.routes);
router.use(write.routes);

export const routes = router;