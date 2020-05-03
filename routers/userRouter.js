import express from "express";
import routes from "../routes";
import {
  userDetail,
  getEditProfile,
  postEditProfile,
  changePassword,
} from "../controllers/userController";
import { onlyPrivate, uploadAvatarMiddleware } from "../globalMiddleware";

const userRouter = express.Router();

userRouter.get(routes.editProfile, onlyPrivate, getEditProfile);
userRouter.post(
  routes.editProfile,
  onlyPrivate,
  uploadAvatarMiddleware,
  postEditProfile
);

userRouter.get(routes.changePassword, onlyPrivate, changePassword);
userRouter.get(routes.userDetail(), onlyPrivate, userDetail);

export default userRouter;
//M data
//V how does the data look
//C function that looks for the data
