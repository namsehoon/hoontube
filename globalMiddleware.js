import routes from "./routes";

export const globalMiddleware = (req, res, next) => {
  res.locals.siteName = "HoonTube";
  res.locals.routes = routes;
  next();
};
