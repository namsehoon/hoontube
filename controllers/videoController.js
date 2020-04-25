import routes from "../routes";
import Video from "../models/Video";

//sort는 정렬 -1은 새로올린게 가장 최신으로 뜨게 만드는것
export const home = async (req, res) => {
  try {
    const videos = await Video.find({}).sort({ _id: -1 });
    res.render("home", { pageTitle: "Home", videos });
  } catch (error) {
    console.log(error);
    res.render("home", { pageTitle: "Home", videos: [] });
  }
};

//쿼리:정보를 질의하는것
//쿼리에서 정보를 가져올려면 메소드가 GET이여야한다.
//빈 객체인 videos는 만약 어떤 비디오도 찾지 못하면 videos로 감
//length는 배열임 [].length 라고 콘솔 해보삼
export const search = async (req, res) => {
  const {
    query: { term: tomato },
  } = req;
  let videos = [];
  try {
    videos = await Video.find({ title: { $regex: tomato, $option: "i" } });
  } catch {}
  res.render("search", { pageTitle: "Search", tomato, videos });
};

export const getUpload = (req, res) => {
  res.render("upload", { pageTitle: "Upload" });
};

export const postUpload = async (req, res) => {
  const {
    body: { title, description },
    file: { path },
  } = req;
  const newVideo = await Video.create({
    fileUrl: path,
    title,
    description,
  });
  console.log(newVideo);
  res.redirect(routes.videoDetail(newVideo.id));
};

//params는 어떠한 /:id, /:potato 데이터를 가지고 오는것

export const videoDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    console.log(video);
    res.render("videoDetail", { pageTitle: "Video Detail", video });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

// get은 뭔가를 채워넣는 작업, post는 업데이트하고 redirect하는 작업
export const getEditVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    res.render("editVideo", { pageTitle: "Edit Video", video });
  } catch (error) {
    res.redirect(routes.home);
  }
};

//중괄호중 하나는, 어떻게 오브젝트를 찾냐, 두번쨰는 업데이트하고 싶은 오브젝트
export const postEditVideo = async (req, res) => {
  const {
    params: { id },
    body: { title, description },
  } = req;
  try {
    await Video.findOneAndUpdate({ _id: id }, { title, description });
    res.redirect(routes.videoDetail(id));
  } catch (error) {
    res.redirect(routes.home);
  }
};
export const deleteVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    await Video.findOneAndRemove({ _id: id });
  } catch (error) {}
  res.redirect(routes.home);
};
