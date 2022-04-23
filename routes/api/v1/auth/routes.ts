import express, { Request, Response, NextFunction } from "express";
import * as sess from  "./sess/routes";

const router = express.Router();

router.use('/sess', sess.routes);

export const routes = router;