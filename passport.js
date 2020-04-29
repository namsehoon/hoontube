import passport from "passport";
import User from "./models/User";

//createStrategy는 이미 구성이 된 passport-local의 localStrategy를 생성함
passport.use(User.createStrategy());

//serialization 어떤 정보를 쿠키에게 주느냐, 어떤field가 쿠키에 포함될 것인지
//민감함 정보를 쿠키에 담으면 안됨
passport.serializeUser(User.serializeUser());
//deserialization어떤 사용자인지 어떻게 찾는가?
//사용자를 식별함
passport.deserializeUser(User.deserializeUser());
