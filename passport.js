import passport from "passport";
import User from "./models/User";
import githubStrategy from "passport-github";
import {
  githubLoginCallback,
  googleLoginCallback,
} from "./controllers/userController";
import routes from "./routes";
import GoogleStrategy from "passport-google-oauth20";

//createStrategy는 이미 구성이 된 passport-local의 localStrategy를 생성함
passport.use(User.createStrategy());

passport.use(
  new githubStrategy(
    {
      clientID: process.env.GIT_ID,
      clientSecret: process.env.GIT_SECRET,
      callbackURL: `http://localhost:5000${routes.gitCallback}`,
    },
    githubLoginCallback
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: "http://localhost:5000/auth/google/callback",
      passReqToCallback: true,
    },
    googleLoginCallback
  )
);

//serialization 어떤 정보를 쿠키에게 주느냐, 어떤field가 쿠키에 포함될 것인지
//민감함 정보를 쿠키에 담으면 안됨
passport.serializeUser(User.serializeUser());
//deserialization어떤 사용자인지 어떻게 찾는가?
//사용자를 식별함
passport.deserializeUser(User.deserializeUser());

//Client ID 385220334053-b3dt5k1e9k1570t2kupsmbia5eokqb2v.apps.googleusercontent.com
//Client secret tKR-rnTrCgi0oFdOkwOvS2Ss
///http://localhost:5000/auth/google/callback
