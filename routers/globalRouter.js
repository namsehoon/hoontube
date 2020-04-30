import express from "express";
import routes from "../routes";
import passport from "passport";
import { githubLogin, postGitLogin } from "../controllers/userController";
import { home, search } from "../controllers/videoController";
import {
  getJoin,
  postJoin,
  getLogin,
  postLogin,
  logout,
} from "../controllers/userController";
import { onlyPrivate, onlyPublic } from "../globalMiddleware";

const globalRouter = express.Router();

export default globalRouter;
globalRouter.get(routes.home, home);

globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin);

globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);

globalRouter.get(routes.logout, onlyPrivate, logout);
globalRouter.get(routes.search, search);

globalRouter.get(routes.github, githubLogin);

globalRouter.get(
  routes.gitCallback,
  passport.authenticate("github", { failureRedirect: "/login" }),
  postGitLogin
);
