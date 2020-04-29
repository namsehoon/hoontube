import express from "express";
import routes from "../routes";
import {
  userDetail,
  editProfile,
  changePassword,
} from "../controllers/userController";
import { onlyPrivate, onlyPublic } from "../globalMiddleware";

const userRouter = express.Router();

userRouter.get(routes.changePassword, onlyPrivate, changePassword);
userRouter.get(routes.editProfile, onlyPrivate, editProfile);
userRouter.get(routes.userDetail(), onlyPrivate, userDetail);

export default userRouter;
//M data
//V how does the data look
//C function that looks for the data
