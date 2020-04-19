import { videos } from "../db";

export const home = (req, res) => {
  res.render("home", { pageTitle: "Home", videos });
};

export const search = (req, res) => {
  //쿼리:정보를 질의하는것
  //쿼리에서 정보를 가져올려면 메소드가 GET이여야한다.
  const {
    query: { term: tomato },
  } = req;
  res.render("search", { pageTitle: "Search", tomato });
};

export const upload = (req, res) =>
  res.render("upload", { pageTitle: "Upload" });
export const videoDetail = (req, res) =>
  res.render("videoDetail", { pageTitle: "Video Detail" });
export const editVideo = (req, res) =>
  res.render("editVideo", { pageTitle: "Edit Video" });
export const deleteVideo = (req, res) =>
  res.render("deleteVideo", { pageTitle: "Delete Video" });
