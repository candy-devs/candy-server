import express, { Request, Response, NextFunction } from "express";
import * as read from "./read";
import * as write from  "./write";
import * as _delete from  "./delete";

const router = express.Router();

router.use(read.routes);
router.use(write.routes);
router.use(_delete.routes);

export const routes = router;