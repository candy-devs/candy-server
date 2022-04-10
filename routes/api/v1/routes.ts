import express, { Request, Response, NextFunction } from "express";
import * as article from "./article/routes";
import * as comment from "./comment/routes";

const router = express.Router();

router.use('/article', article.routes);
router.use('/comment', comment.routes);

export const routes = router;