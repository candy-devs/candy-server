import express, { Request, Response, NextFunction } from "express";
import * as article from "./article/routes";
import * as comment from "./comment/routes";
import * as auth from "./auth/routes";

const router = express.Router();

router.use('/article', article.routes);
router.use('/comment', comment.routes);
router.use('/auth', auth.routes);

export const routes = router;