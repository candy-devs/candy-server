import cors from "cors";
import cookieParser from "cookie-parser";
import createError from "http-errors";
import express, { Request, Response, NextFunction } from "express";

import { routes } from "./routes/routes";
import session from "express-session";
import { config } from "./config/config";
import { sessionStore } from "./auth/sess/sessionStore";

const PORT: number = parseInt(process.env.PORT as string) || 8864;
const HOST: string = process.env.HOST || "localhost";

const app = express();

app.disable("x-powered-by");

app.set("trust proxy", 1);
app.use(
  session({
    secret: config.session.secret,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    proxy: true,
    cookie: {
      // domain: '.',
      // path: '/',
      signed: true,
      maxAge: 60000,
      secure: config.session.secure,
      sameSite: "strict",
      httpOnly: false,
    },
  })
);

// app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(routes);

app.use(function (err: Error, req: Request, res: Response, next: NextFunction) {
  next(createError(404));
});

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, HOST, () => {
    console.log(`server start ${HOST}:${PORT}`);
  });
}

export default app;
