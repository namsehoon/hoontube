import routes from "./routes";
//multer는 비디오업로드하면 파일은 반환하고 파일 URL만 가져옴
import multer from "multer";

const uploadVideo = multer({ dest: "uploads/videos/" });

export const globalMiddleware = (req, res, next) => {
  res.locals.siteName = "HoonTube";
  res.locals.routes = routes;
  res.locals.user = {
    Authenticated: true,
    id: 1,
  };
  next();
};
// '' 여기 안에는  들어올 파일의 이름임
export const uploadVideoMiddleware = uploadVideo.single("videoFile");

//파일 잘못 보냈으때 mongo -> use hoon-tube -> shoe collections -> db.video.remove({})
