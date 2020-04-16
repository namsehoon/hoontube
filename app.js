import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import userRouter from "./routers/userRouter";
import globalRouter from "./routers/globalRouter";
import videoRouter from "./routers/videoRouter";
import routes from "./routes";
import { globalMiddleware } from "./globalMiddleware";

const app = express();

//미들웨어
app.set("view engine", "pug");
app.use(helmet());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
//모든 곳에서 사용할 수 있는 글로벌 변수
app.use(globalMiddleware);

//URL
app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app;
