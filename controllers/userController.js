import passport from "passport";
import routes from "../routes";
import User from "../models/User";
import express from "express";

export const getJoin = (req, res) => {
  res.render("join", { pageTitle: "join" });
};

export const postJoin = async (req, res, next) => {
  const {
    body: { name, email, password, password1 },
  } = req;
  if (password !== password1) {
    res.status(400);
    res.render("join", { pageTitle: "join" });
  } else {
    try {
      //생성
      const user = await User({
        name,
        email,
      });
      //등록
      await User.register(user, password);
      next();
    } catch (error) {
      console.log(error);
      res.redirect(routes.home);
    }
  }
};

export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "login" });

//local은 내가 설치한 strategy의 이름
//passport.authenticate은 username과 password를 찾아보도록 설정되어있음
export const postLogin = passport.authenticate("local", {
  failureRedirect: routes.login,
  successRedirect: routes.home,
});

//깃헙으로 사용자를 보내는거
export const githubLogin = passport.authenticate("github");

export const googleLogin = passport.authenticate("google", {
  scope: "https://www.googleapis.com/auth/plus.login",
});

//깃허브에서 사용자를 콜백하는거
export const githubLoginCallback = async (_, __, profile, cb) => {
  const {
    _json: { id, avatar_url, name, email },
  } = profile;
  try {
    const user = await User.findOne({ email });
    if (user) {
      user.githubId = id;
      user.save();
      //에러 없음, 유저찾음
      return cb(null, user);
    } else {
      const newUser = await User.create({
        avatarUrl: avatar_url,
        name,
        email,
        githubId: id,
      });
      return cb(null, newUser);
    }
  } catch (error) {
    cb(error);
  }
};

export const googleLoginCallback = async (_, __, profile, cb) => {
  //왜그러는지 모르겠지만, 이메일을 안줌
  const {
    _json: { name },
    id,
    email,
  } = profile;
  try {
    const user = await User.findOne({ email });
    if (user) {
      user.googleId = id;
      user.save();
      //에러 없음, 유저찾음
      return cb(null, user);
    }
    const newUser = await User.create({
      name,
      email,
      googleId: id,
    });
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};

export const postGitLogin = (req, res) => {
  res.redirect(routes.home);
};

export const postgGoogleLogin = (req, res) => {
  res.redirect(routes.home);
};

export const getMe = (req, res) => {
  res.render("userDetail", { pageTitle: "user detail", user: req.user });
};

export const logout = (req, res) => {
  req.logout();
  res.redirect(routes.home);
};

export const userDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const user = await User.findById(id);
    res.render("userDetail", { pageTitle: "User Detail", user });
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const getEditProfile = (req, res) =>
  res.render("editProfile", { pageTitle: "editProfile" });

export const postEditProfile = async (req, res) => {
  const {
    body: { name, email },
    file,
  } = req;
  try {
    await User.findByIdAndUpdate(req.user.id, {
      name,
      email,
      //만약 파일이 있으면 파일.패스 없으면 req.user.ava--
      avatarUrl: file ? file.path : req.user.avatarUrl,
    });
    res.redirect(routes.me);
  } catch (error) {
    res.redirect(routes.editProfile);
  }
};

export const getChangePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "changPassword" });

export const postChangePassword = async (req, res) => {
  const {
    body: { oldPassword, newPassword, newPassword1 },
  } = req;
  try {
    if (newPassword !== newPassword1) {
      res.status(400);
      res.redirect(`/users/${routes.changePassword}`);
      return;
    } else {
      await req.user.changePassword(oldPassword, newPassword);
      res.redirect(routes.me);
    }
  } catch (error) {
    res.status(400);
    res.redirect(`/users/${routes.changePassword}`);
  }
};
