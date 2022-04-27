// import { publicKey } from "../config/jwtKey";
import express, { Request, Response, NextFunction } from "express";
import { verifyJWT } from "./jwt.service";

export interface UserLoginInfo {
  id: number,
  user_id: string,
}

export function createSession(req: Request) {
  const reqIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  if (typeof reqIp === 'string')
    req.session.clientIp = reqIp;
  req.session.isLogined = false;
  req.session.save();
}

export function getUserLoginInfo(req: Request): UserLoginInfo | null {
  if (req.session.isLogined === true) {
    if (req.session.loginInfo !== undefined)
      return req.session.loginInfo;
  }

  if (req.cookies['jwt'] !== undefined)
    return verifyJWT(req.cookies['jwt']!);

  return null;
}