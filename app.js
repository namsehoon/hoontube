import express from "express";
import morgan from "morgan";
import mongoStore from "connect-mongo";
import helmet from "helmet";
import passport from "passport";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import session from "express-session";
import cookieParser from "cookie-parser";
import userRouter from "./routers/userRouter";
import globalRouter from "./routers/globalRouter";
import videoRouter from "./routers/videoRouter";
import routes from "./routes";
import { globalMiddleware } from "./globalMiddleware";
import apiRouter from "./routers/apiRouter";

import "./passport";

const CokieStore = mongoStore(session);

const app = express();

//미들웨어
app.use(helmet());
app.set("view engine", "pug");
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("static"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
//쿠키를  해석함
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: true,
    //새로운 저장소를 만들고 // 몽구스랑 연결해주는 거
    store: new CokieStore({ mongooseConnection: mongoose.connection }),
  })
);

//쿠키에서부터 쭉 내려와서 passport는 초기화 되고
///passport가 제 스스로 쿠키를 들여다 봐서 정보에 해당하는 사용자를 찾아줌
//그 다음에 글로벌미들웨어에서 요청한 유저를 만들어주지
app.use(passport.initialize());
//쿠키를 이용하기위해서 필요한 거, 세션을 저장해줌
app.use(passport.session());

//모든 곳에서 사용할 수 있는 글로벌 변수
app.use(globalMiddleware);

//URL
app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);
app.use(routes.api, apiRouter);

export default app;
